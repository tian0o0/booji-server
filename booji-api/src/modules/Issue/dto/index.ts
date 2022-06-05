import { ApiModelProperty } from "@nestjs/swagger";
import { Status } from "../issue.entity";

export class ReportDto {
  @ApiModelProperty()
  readonly type?: string;
  @ApiModelProperty()
  readonly message?: string;
  @ApiModelProperty()
  readonly level?: string;
  @ApiModelProperty()
  readonly performance?: Object;
}
export class UpdateIssueDto {
  @ApiModelProperty()
  readonly assigneeId?: number;
  @ApiModelProperty()
  readonly status?: Status;
}
