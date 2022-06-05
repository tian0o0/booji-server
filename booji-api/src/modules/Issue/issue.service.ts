import { Kafka } from "kafkajs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { parseLocate, parseUa } from "@utils/HeaderParser";
import { ReportDto, UpdateIssueDto } from "./dto";
import { IssueEntity } from "./issue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ProjectEntity } from "@modules/Project/project.entity";
import { TagEntity } from "@modules/Tag/tag.entity";
import { UserEntity } from "@modules/User/user.entity";
import { SearchService } from "@modules/Search/search.service";
import { TagService } from "@modules/Tag/tag.service";
import { SmService } from "@modules/SourceMap/sm.service";
interface Headers {
  "x-real-ip": string;
  "user-agent": string;
}

type SortBy = "updatedAt" | "createdAt" | "level";
type Order = "ASC" | "DESC";

@Injectable()
export class IssueService {
  private kafka: Kafka;
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private searchService: SearchService,
    private tagService: TagService,
    private smService: SmService
  ) {
    // console.log(this.configService.get("port"));
    this.kafka = new Kafka({
      // clientId: "aaa",
      brokers: ["localhost:9092"],
    });
    this.consume();
  }
  async getIssueList(
    perPage: number,
    page: number,
    appKey: string,
    status: number,
    sort: SortBy,
    order: Order
  ): Promise<any> {
    const [data, count] = await getRepository(IssueEntity)
      .createQueryBuilder("issue")
      .take(perPage)
      .skip(page * perPage)
      .where("issue.project = :appKey", { appKey })
      .andWhere("issue.status = :status", { status })
      .addSelect(
        "case when issue.level='critical' then 1 when issue.level='error' then 2 when issue.level='warn' then 3 when issue.level='log' then 4 when issue.level='info' then 5 when issue.level='debug' then 6 else null end",
        "issue.level"
      )
      .orderBy(`issue.${sort}`, order)
      .cache(true)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async getEventList(
    perPage: number,
    page: number,
    issueId: number
  ): Promise<any> {
    const from = page * perPage;
    const size = perPage;
    return await this.searchService.search(from, size, issueId);
  }

  beforeProduce(body: ReportDto, headers: Headers): Promise<void> {
    const ip = headers["x-real-ip"];
    const userAgent = headers["user-agent"];

    // const locate = parseLocate("171.113.29.179");
    const locate = parseLocate(ip);
    const ua = parseUa(userAgent);

    const event = {
      ...body,
      locate,
      ua,
    };

    this.produce(event);

    return;
  }

  async produce(event) {
    const producer = this.kafka.producer({
      allowAutoTopicCreation: false,
    });
    await producer.connect();
    await producer.send({
      topic: "test",
      messages: [{ value: JSON.stringify(event) }],
    });
    await producer.disconnect();
  }

  async consume() {
    const consumer = this.kafka.consumer({ groupId: "bbb" });
    await consumer.connect();
    await consumer.subscribe({
      topic: "test",
      fromBeginning: false,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.report(message.value.toString());
      },
    });
  }

  async report(data: string) {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    // 每一个 event 写入 es
    this.searchService.save(parsedData);

    // 根据 issueId 判断是否是属于同一issue（是则issue count +1, 否则新增issue）
    const issue = await await this.issueRepository.findOne({
      issueId: parsedData.issueId,
    });
    if (issue) {
      if (!issue.users.includes(parsedData.user.id)) {
        issue.users.push(parsedData.user.id);
      }
      issue.eventCount++;
      issue.tags = [...issue.tags, ...(await this.generateTags(parsedData))];
      return await this.issueRepository.save(issue);
    }

    let newIssue = new IssueEntity();
    newIssue.type = parsedData.type;
    newIssue.category = parsedData.category;
    newIssue.level = parsedData.level;
    newIssue.message = parsedData.message;
    newIssue.stack = parsedData.stack;
    newIssue.row = parsedData.row;
    newIssue.col = parsedData.col;
    newIssue.release = parsedData.release;
    newIssue.issueId = parsedData.issueId;
    newIssue.eventCount = 1;
    newIssue.project = await this.projectRepository.findOne(parsedData.appKey);
    newIssue.tags = await this.generateTags(parsedData);
    // 保存 userId, 用于统计 issue 影响的用户数量
    if (newIssue.users?.length) {
      newIssue.users.push(parsedData.user.id);
    } else {
      newIssue.users = [parsedData.user.id];
    }

    return await this.issueRepository.save(newIssue);
  }

  async getIssueDetail(id: string): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({ issueId: id });
    if (!issue) {
      throw new NotFoundException("issueId不存在");
    }
    // 解析sourcemap
    const source = await this.smService.parseSourceMap({
      appKey: issue.project,
      stack: issue.stack,
      row: issue.row,
      col: issue.col,
      release: issue.release,
    });
    return {
      ...issue,
      source,
    };
  }

  async update(
    issueId: string,
    { assigneeId, status }: UpdateIssueDto
  ): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({ issueId });
    const assignee = await this.userRepository.findOne(assigneeId);
    issue.assignee = assignee || null;
    issue.status = status;
    return await this.issueRepository.save(issue);
  }

  async generateTags(parsedData): Promise<TagEntity[]> {
    let tags: TagEntity[] = [];

    // ua: {
    //   ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    //   browser: { name: 'Mobile Safari', version: '10.0', major: '10' },
    //   engine: { name: 'WebKit', version: '603.1.30' },
    //   os: { name: 'iOS', version: '10.3.1' },
    //   device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
    //   cpu: {}
    // }
    for (let key in parsedData.ua) {
      if (key === "ua") continue;
      const val = parsedData.ua[key];
      let tag: any = {};

      if (["browser", "engine", "os"].includes(key)) {
        tag.key = key;
        tag.value = `${val.name} ${val.version}`;
      } else if (key === "device") {
        // pc浏览器上报时此对象为空，设置默认值
        if (Object.keys(val).length === 0) {
          tag.key = "type";
          tag.value = "pc";
        }
        for (let deviceKey in val) {
          tag.key = deviceKey;
          tag.value = val[deviceKey];
        }
      }

      const savedTag = await this.tagService.save(parsedData.issueId, tag);
      savedTag && tags.push(savedTag);
    }

    // locate: {
    //   range: [ 2876309504, 2876342271 ],
    //   country: 'CN',
    //   region: 'HB',
    //   eu: '0',
    //   timezone: 'Asia/Shanghai',
    //   city: 'Wuhan',
    //   ll: [ 30.5856, 114.2665 ],
    //   metro: 0,
    //   area: 1
    // }
    if (parsedData.locate) {
      const ignoredKeys = ["range", "eu", "timezone", "metro", "area", "ll"];
      for (let key in parsedData.locate) {
        if (ignoredKeys.includes(key)) continue;
        const val = parsedData.locate[key];
        let tag: any = {};
        tag.key = key;
        tag.value = val;

        const savedTag = await this.tagService.save(parsedData.issueId, tag);
        savedTag && tags.push(savedTag);
      }
    }

    return tags;
  }
}
