import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { UrlEntity } from "./performance.entity";
import { PerformanceData, PerformanceService } from "./performance.service";

@ApiBearerAuth()
@ApiUseTags("performance")
@Controller()
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @ApiOperation({ title: "性能上报" })
  @Post("booji/performance")
  @UseInterceptors(FileInterceptor("")) // Handle FormData
  @HttpCode(204)
  report(@Body() body: any): Promise<void> {
    return this.performanceService.report({
      ...body,
      data: JSON.parse(body.data),
    });
  }

  @ApiOperation({ title: "获取某个项目下的url列表" })
  @Get("project/:appKey/urls")
  listUrl(@Param("appKey") appKey: string): Promise<UrlEntity[]> {
    return this.performanceService.getUrlList(appKey);
  }

  @ApiOperation({ title: "获取某个url下的性能数据列表" })
  @Get("url/:id/performances")
  list(@Param("id") urlId: number): Promise<PerformanceData> {
    return this.performanceService.getList(urlId);
  }
}
