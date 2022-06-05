import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { ProjectEntity } from "./project.entity";
import { ProjectService } from "./project.service";

@ApiBearerAuth()
@ApiUseTags("project")
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({ title: "获取项目列表" })
  @Get()
  async findAll(@Query() query): Promise<ProjectEntity[]> {
    const { perPage = 10, page = 1 } = query;
    const _perPage = Math.max(perPage * 1, 1);
    const _page = Math.max(page * 1, 1) - 1;
    return await this.projectService.findAll(_perPage, _page);
  }

  @ApiOperation({ title: "新建项目" })
  @Post()
  async create(@Body() data: any): Promise<ProjectEntity> {
    return await this.projectService.create(data);
  }

  @ApiOperation({ title: "删除项目" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.projectService.delete(id);
  }
}
