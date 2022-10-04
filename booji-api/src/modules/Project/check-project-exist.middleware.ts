import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ProjectService } from "./project.service";

@Injectable()
export class CheckProjectExistMiddleware implements NestMiddleware {
  constructor(private readonly projectService: ProjectService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const project = await this.projectService.findByAppKey(req.body.appKey);
    if (!project) {
      throw new NotFoundException("appKey不正确");
    }
    // DELETE req.project = project;
    next();
  }
}
