import { Connection } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { utilities, WinstonModule } from "nest-winston";
// import * as winston from "winston";
import { UserModule } from "@modules/User/user.module";
import { AppController } from "./app.controller";
import { ProjectModule } from "@modules/Project/project.module";
import { IssueModule } from "@modules/Issue/issue.module";
import { TagModule } from "@modules/Tag/tag.module";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { PerformanceModule } from "@modules/performance/performance.module";
import { SmModule } from "@modules/SourceMap/sm.module";
// import { ServeStaticModule } from "@nestjs/serve-static";
// import { join } from "path";
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         winston.format.ms(),
    //         utilities.format.nestLike("Booji", {
    //           prettyPrint: true,
    //         })
    //       ),
    //     }),
    //   ],
    // }),
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局，各模块中直接使用 configService 为不用导入 configModule
      load: [config], // 注入自定义配置文件
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    // ClientsModule.register(microserviceConfig),
    UserModule,
    ProjectModule,
    IssueModule,
    TagModule,
    PerformanceModule,
    SmModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "static"),
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
