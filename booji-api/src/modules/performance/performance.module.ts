import { CheckProjectExistMiddleware } from "@modules/Project/check-project-exist.middleware";
import { ProjectEntity } from "@modules/Project/project.entity";
import { ProjectModule } from "@modules/Project/project.module";
import { AuthMiddleware } from "@modules/User/middleware/auth.middleware";
import { UserModule } from "@modules/User/user.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformanceController } from "./performance.controller";
import { UrlEntity, PerformanceEntity } from "./performance.entity";
import { PerformanceService } from "./performance.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlEntity, PerformanceEntity, ProjectEntity]),
    ProjectModule,
    UserModule,
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService],
})
export class PerformanceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckProjectExistMiddleware)
      .forRoutes("api/booji/performance")
      .apply(AuthMiddleware)
      .exclude("api/booji/performance");
  }
}
