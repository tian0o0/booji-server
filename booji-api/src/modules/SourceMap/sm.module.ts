import { CheckProjectExistMiddleware } from "@modules/Project/check-project-exist.middleware";
import { ProjectModule } from "@modules/Project/project.module";
import { AuthMiddleware } from "@modules/User/middleware/auth.middleware";
import { UserModule } from "@modules/User/user.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmController } from "./sm.controller";
import { SmEntity } from "./sm.entity";
import { SmService } from "./sm.service";

@Module({
  imports: [TypeOrmModule.forFeature([SmEntity]), UserModule, ProjectModule],
  controllers: [SmController],
  providers: [SmService],
  exports: [SmService],
})
export class SmModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SmController)
      .apply(CheckProjectExistMiddleware)
      .forRoutes(SmController);
  }
}
