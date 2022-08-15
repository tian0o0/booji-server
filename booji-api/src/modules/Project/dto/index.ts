import { ApiModelProperty } from "@nestjs/swagger";
import { Platform } from "@type/index";

export class AddProjectDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly platform: Platform;
  @ApiModelProperty()
  readonly desc?: string;
}

export class UpdateProjectDto {
  @ApiModelProperty()
  readonly ruleMinute?: number;
  @ApiModelProperty()
  readonly ruleCount?: number;
}
