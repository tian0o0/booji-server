import { IssueEntity } from "@modules/Issue/issue.entity";
import { ProjectEntity } from "@modules/Project/project.entity";
import { SearchService } from "@modules/Search/search.service";
import { TagEntity } from "@modules/Tag/tag.entity";
import { TagService } from "@modules/Tag/tag.service";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CompressionTypes, Consumer, Kafka, Producer } from "kafkajs";
import { Repository } from "typeorm";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private configService: ConfigService,
    private searchService: SearchService,
    private tagService: TagService
  ) {}

  async onModuleInit(): Promise<void> {
    this.kafka = new Kafka({
      clientId: "booji-server",
      brokers: [this.configService.get("kafkaBroker")],
    });
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: false,
    });
    this.consumer = this.kafka.consumer({
      groupId: "consumer-group",
    });
    await this.connect();

    await this.consumer.subscribe({ topic: "booji", fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log(partition); // kafkajs默认有4个分区
        this.onConsume(message.value.toString());
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  async connect() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  /**
   * 向kafka发送消息
   */
  async send(event: any) {
    await this.producer.connect();
    const metadata = await this.producer
      .send({
        topic: "booji",
        /**
         * acks: 0
         * 表示生产者在成功写入消息之前不会等待任何来自服务器的响应.
         * 换句话说，一旦出现了问题导致服务器没有收到消息，那么生产者就无从得知，消息也就丢失了.
         * 改配置由于不需要等到服务器的响应，所以可以以网络支持的最大速度发送消息，从而达到很高的吞吐量
         */
        acks: 0,
        /**
         * 消息压缩方式：GZIP
         * The consumers know how to decompress GZIP, so no further work is necessary.
         */
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(event) }],
      })
      .catch((e) => console.error(e.message, e));
    await this.producer.disconnect();
    return metadata;
  }

  /**
   * 消费kafka消息后入库操作
   */
  async onConsume(event: string) {
    const parsedData = JSON.parse(event);

    // 每一个 event 写入 es(写入失败终止流程)
    await this.searchService.save(parsedData);

    // 根据 issueId 判断是否是属于同一issue（是则issue count +1, 否则新增issue）
    const issue = await this.issueRepository.findOne({
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
