import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Injectable()
export class CheckProjectExistMiddleware implements NestMiddleware {
  constructor(private readonly projectService: ProjectService) {}

  async use(req: any, res: any, next: () => void) {
    const project = await this.projectService.findById(req.body.appKey);
    if (!project) {
      throw new NotFoundException("appKey不正确");
    }
    req.project = project;
    next();
  }
}
