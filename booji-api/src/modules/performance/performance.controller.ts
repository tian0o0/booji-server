import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
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
  @HttpCode(204)
  report(@Body() body: any): Promise<void> {
    return this.performanceService.report(body);
  }

  @ApiOperation({ title: "获取性能数据" })
  @Get("performances")
  list(@Query() query: any): Promise<Pagination<PerformanceEntity>> {
    return this.performanceService.getList(query.appKey);
  }
}
