import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}
