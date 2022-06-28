import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiModelProperty({
    required: false,
  })
  readonly name?: string;
  @ApiModelProperty({
    required: false,
  })
  readonly email?: string;
  @ApiModelProperty({
    required: false,
  })
  readonly password?: string;
  @ApiModelProperty({
    required: false,
  })
  readonly isAdmin?: boolean;
}
