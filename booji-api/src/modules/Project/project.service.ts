import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
  ) {}

  async findAll(perPage: number, page: number): Promise<any> {
    const [data, count] = await getRepository(ProjectEntity)
      .createQueryBuilder("project")
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

  async delete(id: string): Promise<DeleteResult> {
    return await this.projectRepository.delete({ appKey: id });
  }
}
