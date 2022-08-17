import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { UserRO, UserService } from "./user.service";
import { Pagination } from "@type/index";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto";

@ApiBearerAuth()
@ApiUseTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ title: "获取用户列表" })
  @Get()
  async findAll(@Query() query): Promise<Pagination<UserEntity>> {
    const { perPage = 10, page = 1 } = query;
    const _perPage = Math.max(perPage * 1, 1);
    const _page = Math.max(page * 1, 1) - 1;
    return await this.userService.findAll(_perPage, _page);
  }

  @ApiOperation({ title: "注册" })
  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @ApiOperation({ title: "登录" })
  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);
    if (!_user) throw new BadRequestException("用户名或密码不正确");

    const token = await this.userService.generateJWT(_user);

    const { id, email, name, isAdmin } = _user;
    return { id, email, token, name, isAdmin };
  }

  @ApiOperation({ title: "更新用户" })
  @Patch(":id")
  async update(@Param("id") userId: number, @Body() userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @ApiOperation({ title: "删除用户" })
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.userService.delete(id);
  }

  @ApiOperation({ title: "Github登录" })
  @Get("oauth/github")
  async github(@Query("code") code: string) {
    return await this.userService.github(code);
  }
}
