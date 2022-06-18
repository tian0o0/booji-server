import { CheckProjectExistMiddleware } from "@modules/Project/check-project-exist.middleware";
import { ProjectModule } from "@modules/Project/project.module";
import { SearchModule } from "@modules/Search/search.module";
import { SmModule } from "@modules/SourceMap/sm.module";
import { AuthMiddleware } from "@modules/User/middleware/auth.middleware";
import { UserEntity } from "@modules/User/user.entity";
import { UserModule } from "@modules/User/user.module";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IssueController } from "./issue.controller";
import { IssueEntity } from "./issue.entity";
import { IssueService } from "./issue.service";
/**
 * issueModule and TagModule is the relationship of Circular dependency
 * cannot use: `imports: [TagModule]`, but use `forwardRef` on each other
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([IssueEntity, UserEntity]),
    UserModule,
    SearchModule,
    SmModule,
    ProjectModule,
  ],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService],
})
export class IssueModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckProjectExistMiddleware)
      .forRoutes("api/booji")
      .apply(AuthMiddleware)
      .forRoutes({ path: "api/issue", method: RequestMethod.ALL });
  }
}
