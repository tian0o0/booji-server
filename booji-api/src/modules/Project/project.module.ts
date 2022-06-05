import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "@modules/User/middleware/auth.middleware";
import { ProjectController } from "./project.controller";
import { ProjectEntity } from "./project.entity";
import { ProjectService } from "./project.service";
import { UserModule } from "@modules/User/user.module";
import { CheckAdminMiddleware } from "@modules/User/middleware/check-admin.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ProjectController)
      .apply(CheckAdminMiddleware)
      .forRoutes({ path: "project/:id(\\d+)", method: RequestMethod.ALL });
  }
}
