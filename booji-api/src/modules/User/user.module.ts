import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CheckAdminMiddleware } from "./middleware/check-admin.middleware";
import { CheckOwnMiddleware } from "./middleware/check-owner.middleware";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "user/login", method: RequestMethod.POST },
        { path: "user", method: RequestMethod.POST }
      )
      .forRoutes(UserController)
      .apply(CheckOwnMiddleware)
      .forRoutes({ path: "user/:id(\\d+)", method: RequestMethod.ALL })
      .apply(CheckAdminMiddleware)
      .forRoutes({ path: "user/:email", method: RequestMethod.DELETE });
  }
}
