import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@modules/User/user.module";
import { AppController } from "./app.controller";
import { ProjectModule } from "@modules/Project/project.module";
import { IssueModule } from "@modules/Issue/issue.module";
import { TagModule } from "@modules/Tag/tag.module";
import { ConfigModule } from "@nestjs/config";
import { PerformanceModule } from "@modules/Performance/performance.module";
import { SmModule } from "@modules/SourceMap/sm.module";
import { KafkaModule } from "@modules/Kafka/kafka.module";
import config from "./config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局，各模块中直接使用 configService 为不用导入 configModule
      load: [config], // 注入自定义配置文件
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    EventEmitterModule.forRoot(),
    KafkaModule,
    UserModule,
    ProjectModule,
    IssueModule,
    TagModule,
    PerformanceModule,
    SmModule,
    // ClientsModule.register(microserviceConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {
  constructor() {}
}
