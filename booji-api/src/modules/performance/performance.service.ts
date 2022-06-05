import { ProjectEntity } from "@modules/Project/project.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { PerformanceEntity } from "./performance.entity";

interface Payload {
  appKey: string;
  data: any;
  url: string;
}

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(PerformanceEntity)
    private readonly performanceRepository: Repository<PerformanceEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
  ) {}
  async report({ appKey, data, url }: Payload): Promise<any> {
    // const p = await this.performanceRepository.findOne({ url });
    // // if(p) {
    // //   p.visitCount++;

    // // }
    const project = await this.projectRepository.findOne(appKey);

    let performance = new PerformanceEntity();
    performance.url = url;
    performance.dns = data.dns;
    performance.tcp = data.tcp;
    performance.request = data.request;
    performance.response = data.response;
    performance.processing = data.processing;
    performance.load = data.load;
    performance.project = await this.projectRepository.findOne(appKey);

    return await this.performanceRepository.save(performance);
  }

  async getList(appKey: string) {
    const [data, count] = await getRepository(PerformanceEntity)
      .createQueryBuilder("p")
      // .take(perPage)
      // .skip(page * perPage)
      .where("p.project = :appKey", { appKey })
      .cache(true)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }
}
