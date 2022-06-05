import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const user = await this.userService.findById(req.user.id);
    if (!user.isAdmin) {
      throw new ForbiddenException("没有权限，您不是admin用户");
    }
    next();
  }
}
