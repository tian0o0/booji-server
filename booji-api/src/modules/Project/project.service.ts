import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "@type/index";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "@modules/User/user.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @Inject(REQUEST)
    private readonly req: Request
  ) {}

  async findAll(
    perPage: number,
    page: number
  ): Promise<Pagination<ProjectEntity>> {
    const [data, count] = await getRepository(ProjectEntity)
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.users", "user")
      .take(perPage)
      .skip(page * perPage)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async create(dto: any): Promise<ProjectEntity> {
    // check uniqueness of username/email
    const { name, platform, desc } = dto;
    const qb = await getRepository(ProjectEntity)
      .createQueryBuilder("project")
      .where("project.name = :name", { name });

    const project = await qb.getOne();

    if (project) {
      throw new ConflictException("项目名重复");
    }

    // create new user
    let newProject = new ProjectEntity();
    newProject.name = name;
    newProject.platform = platform;
    newProject.desc = desc;

    return await this.projectRepository.save(newProject);
  }

  async findById(id: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne(id);
  }

  async findByAppKey(appKey: string): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({ appKey });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.projectRepository.delete(id);
  }

  async update(id: number): Promise<void> {
    const project = await this.projectRepository.findOne(id, {
      relations: ["users"],
    });
    const index = project.users.findIndex(
      (user) => user.id === this.req.user.id
    );
    if (index > -1) {
      // unsubscrible
      project.users.splice(index, 1);
    } else {
      // subscrible
      project.users.push(this.req.user);
    }
    await this.projectRepository.save(project);
  }
}
