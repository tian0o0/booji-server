import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CompressionTypes, Consumer, Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
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
        this.eventEmitter.emit("booji", message.value.toString());
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
   * @param event 事件
   * @returns RecordMetadata[]
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
}
