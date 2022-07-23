import { KafkaService } from "@modules/Kafka/kafka.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const MySQLEvents = require("@rodrigogs/mysql-events");

@Injectable()
export class BinlogService {
  private connector: any;

  constructor(
    private kafkaService: KafkaService,
    private configService: ConfigService
  ) {}

  async onModuleInit() {
    if (this.connector) return;
    const dsn = this.configService.get("mysql");

    this.connector = new MySQLEvents(dsn, {
      startAtEnd: true,
      excludedSchemas: {
        mysql: true,
      },
    });

    await this.connector.start();

    this.connector.addTrigger({
      name: "TEST",
      expression: "booji.issue", // 仅监听issue表
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (e) => {
        const event = e.affectedRows[0]?.after;
        this.kafkaService.send("es", event);
      },
    });

    this.connector.on(MySQLEvents.EVENTS.CONNECTION_ERROR, this.onError);
    this.connector.on(MySQLEvents.EVENTS.ZONGJI_ERROR, this.onError);
  }

  onModuleDestroy() {
    this.connector.stop();
  }

  private onError(e: any) {
    console.log(e);
    this.connector.stop();
  }
}
