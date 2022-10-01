import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "../user.service";
import { UserEntity } from "../user.entity";

export interface CustomRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: CustomRequest, _: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization || "";
    const token = authHeaders.split(" ")[1];
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(id);
      if (!user) {
        throw new HttpException("未知用户！", HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      throw new HttpException("请登录！", HttpStatus.UNAUTHORIZED);
    }
  }
}
