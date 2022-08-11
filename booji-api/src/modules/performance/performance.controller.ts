import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { Pagination } from "@type/index";
import { PerformanceEntity } from "./performance.entity";
import { PerformanceService } from "./performance.service";

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

  @ApiOperation({ title: "获取性能数据" })
  @Get("performances")
  list(@Query() query: any): Promise<Pagination<PerformanceEntity>> {
    return this.performanceService.getList(query.appKey);
  }
}
