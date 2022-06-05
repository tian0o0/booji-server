import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
const jwt = require("jsonwebtoken");
import { validate } from "class-validator";
import { verify } from "argon2";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { LoginUserDto, UpdateUserDto } from "./dto";

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
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async findAll(perPage: number, page: number): Promise<UserEntity[]> {
    return await getRepository(UserEntity)
      .createQueryBuilder("user")
      .take(perPage)
      .skip(page * perPage)
      .cache(true)
      .getMany();
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { name, email, password } = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder("user")
      .where("user.name = :name", { name })
      .orWhere("user.email = :email", { email });

    const user = await qb.getOne();

    if (user) {
      throw new ConflictException("用户名或邮箱已存在");
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

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.userRepository.findOne(id);
    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: ["id", "name", "email", "isAdmin", "password"], // 这里要加id，不然报错
      where: { email },
    });
    if (!user) {
      return null;
    }

    if (await verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET
    );
  }

  private buildUserRO(user: UserEntity): UserRO {
    return { ...user, token: this.generateJWT(user) };
  }
}
