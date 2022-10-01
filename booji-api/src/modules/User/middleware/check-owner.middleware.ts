import { ForbiddenException } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth.middleware";

export function CheckOwnMiddleware(
  req: CustomRequest,
  _: Response,
  next: NextFunction
) {
  if (req.user.id === Number(req.params.id)) {
    next();
  } else {
    throw new ForbiddenException("没有权限");
  }
}
