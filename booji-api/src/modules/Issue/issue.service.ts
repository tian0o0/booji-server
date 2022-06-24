import { Injectable, NotFoundException } from "@nestjs/common";
import { parseLocate, parseUa } from "@utils/header-parser";
import { ReportDto, UpdateIssueDto } from "./dto";
import { IssueEntity } from "./issue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "@modules/User/user.entity";
import { SearchService } from "@modules/Search/search.service";
import { SmService } from "@modules/SourceMap/sm.service";
import { KafkaService } from "@modules/Kafka/kafka.service";
interface Headers {
  "x-real-ip": string;
  "user-agent": string;
}

type SortBy = "updatedAt" | "createdAt" | "level";
type Order = "ASC" | "DESC";

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private searchService: SearchService,
    private smService: SmService // private kafkaService: KafkaService
  ) {}
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

  async getIssueDetail(id: string): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({ issueId: id });
    if (!issue) {
      throw new NotFoundException("issueId不存在");
    }

    // 解析sourcemap
    const source = await this.smService.parseSourceMap({
      appKey: issue.appKey,
      stack: issue.stack,
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

  beforeProduce(body: ReportDto, headers: Headers) {
    const ip = headers["x-real-ip"];
    const userAgent = headers["user-agent"];

    // 171.113.29.179
    const locate = parseLocate(ip);
    const ua = parseUa(userAgent);

    const event = {
      ...body,
      locate,
      ua,
    };

    // this.kafkaService.send(event);
  }
}
