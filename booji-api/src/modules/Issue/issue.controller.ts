import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { Pagination } from "@type/index";
import { ReportDto, UpdateIssueDto } from "./dto";
import { IssueEntity } from "./issue.entity";
import { IssueService } from "./issue.service";

@ApiBearerAuth()
@ApiUseTags("issue")
@Controller()
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @ApiOperation({ title: "获取issue列表" })
  @Get("issue")
  async issue(@Query() query: any): Promise<Pagination<IssueEntity>> {
    const {
      perPage = 10,
      page = 1,
      appKey,
      status,
      sort = "createdAt",
      order = "ASC",
    } = query;
    const _perPage = Math.max(perPage * 1, 1);
    const _page = Math.max(page * 1, 1) - 1;
    return await this.issueService.getIssueList(
      _perPage,
      _page,
      appKey,
      status,
      sort,
      order
    );
  }

  @ApiOperation({ title: "获取issue详情" })
  @Get("issue/:id")
  async detail(@Param("id") issueId: string): Promise<IssueEntity> {
    return await this.issueService.getIssueDetail(issueId);
  }

  @ApiOperation({ title: "获取issue下的event列表" })
  @Get("issue/:id/events")
  async event(
    @Param("id") issueId: number,
    @Query() query: any
  ): Promise<Pagination<IssueEntity>> {
    const { perPage = 10, page = 1 } = query;
    const _perPage = Math.max(perPage * 1, 1);
    const _page = Math.max(page * 1, 1) - 1;
    return await this.issueService.getEventList(_perPage, _page, issueId);
  }

  @ApiOperation({ title: "更新issue" })
  @Patch("issue/:id")
  async update(
    @Param("id") issueId: string,
    @Body() body: UpdateIssueDto
  ): Promise<IssueEntity> {
    return await this.issueService.update(issueId, body);
  }

  @ApiOperation({ title: "上报" })
  @Post("booji")
  @HttpCode(204)
  report(@Body() body: ReportDto, @Headers() headers) {
    this.issueService.report(body, headers);
  }
}
