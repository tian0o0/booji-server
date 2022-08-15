import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { Pagination } from "@type/index";
import { ProjectEntity } from "./project.entity";
import { ProjectService } from "./project.service";

@ApiBearerAuth()
@ApiUseTags("project")
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({ title: "获取项目列表" })
  @Get()
  async findAll(@Query() query): Promise<Pagination<ProjectEntity>> {
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
  async delete(@Param("id") id: number) {
    return await this.projectService.delete(id);
  }

  @ApiOperation({ title: "订阅/取消订阅项目" })
  @Patch(":id/subscribe")
  @HttpCode(204)
  async subscribe(@Param("id") id: number) {
    await this.projectService.update(id);
  }
}
