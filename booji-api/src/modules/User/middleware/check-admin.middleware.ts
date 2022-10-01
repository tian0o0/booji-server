import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { UserService } from "../user.service";
import { CustomRequest } from "./auth.middleware";
@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: CustomRequest, _: Response, next: NextFunction) {
    const user = await this.userService.findById(req.user.id);
    if (!user.isAdmin) {
      throw new ForbiddenException("没有权限，您不是admin用户");
    }
    next();
  }
}
