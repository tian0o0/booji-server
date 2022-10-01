import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import axios from "axios";
import { validate } from "class-validator";
import { verify } from "@utils/crypto";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { LoginUserDto, UpdateUserDto } from "./dto";
import { Pagination } from "@type/index";
import { ConfigService } from "@nestjs/config";

const jwt = require("jsonwebtoken");
export interface UserRO {
  id: number;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}
  async findAll(
    perPage: number,
    page: number
  ): Promise<Pagination<UserEntity>> {
    const [data, count] = await getRepository(UserEntity)
      .createQueryBuilder("user")
      .take(perPage)
      .skip(page * perPage)
      .getManyAndCount();
    return {
      data,
      count,
    };
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username
    const { name, email, password } = dto;
    const user = await this.userRepository.findOne({
      where: { name },
    });

    if (user) {
      throw new ConflictException("用户名已存在");
    }

    // create new user
    let newUser = new UserEntity();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new BadRequestException("参数校验错误！");
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async login(dto: LoginUserDto): Promise<UserRO> {
    const user = await this.findOne(dto);
    if (!user) throw new BadRequestException("用户名或密码不正确");

    const token = await this.generateJWT(user.id);
    const { id, email, name, isAdmin } = user;
    return { id, email, token, name, isAdmin };
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.userRepository.findOne(id);
    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async findOne({ name, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: ["id", "name", "email", "isAdmin", "password"],
      where: { name },
    });
    if (!user) {
      return null;
    }

    if (verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    let res;
    try {
      res = await this.userRepository.delete(id);
    } catch (e) {
      throw new ForbiddenException("某个Issue的负责人为该用户");
    }

    return res;
  }

  async github(code: string) {
    const { clientId, clientSecret } = this.configService.get("github");

    const tokenResponse = await axios({
      method: "post",
      url:
        "https://github.com/login/oauth/access_token?" +
        `client_id=${clientId}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: "application/json",
      },
    });

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      throw new UnauthorizedException("Github OAuth code已过期");
    }

    const res = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });
    return this.create({
      name: res.data.name,
      email: res.data.email,
      password: "666",
    });
  }

  public generateJWT(userId: number) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: userId,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET
    );
  }

  private buildUserRO(user: UserEntity): UserRO {
    return { ...user, token: this.generateJWT(user.id) };
  }
}
