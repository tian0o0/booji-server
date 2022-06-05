import { CheckProjectExistMiddleware } from "@modules/Project/check-project-exist.middleware";
import { ProjectEntity } from "@modules/Project/project.entity";
import { ProjectModule } from "@modules/Project/project.module";
import { AuthMiddleware } from "@modules/User/middleware/auth.middleware";
import { UserModule } from "@modules/User/user.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformanceController } from "./performance.controller";
import { PerformanceEntity } from "./performance.entity";
import { PerformanceService } from "./performance.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformanceEntity, ProjectEntity]),
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
      .forRoutes("booji/performance")
      .apply(AuthMiddleware)
      .forRoutes("/performances");
  }
}
