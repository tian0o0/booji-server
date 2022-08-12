import { ProjectEntity } from "@modules/Project/project.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PerformanceEntity, UrlEntity } from "./performance.entity";

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
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>
  ) {}
  async report({ appKey, data, url: urlStr }: Payload): Promise<void> {
    // Save UrlEntity and PerformanceEntity
    let existedUrl = await this.urlRepository.findOne({ appKey, url: urlStr });
    if (!existedUrl) {
      let url = new UrlEntity();
      url.url = urlStr;
      url.appKey = appKey;
      url.project = await this.projectRepository.findOne({ appKey });
      existedUrl = await this.urlRepository.save(url);
    }
    let performance = new PerformanceEntity();
    performance.dns = data.dns;
    performance.tcp = data.tcp;
    performance.request = data.request;
    performance.response = data.response;
    performance.processing = data.processing;
    performance.load = data.load;
    performance.url = existedUrl;
    await this.performanceRepository.save(performance);
  }

  async getUrlList(appKey: string): Promise<UrlEntity[]> {
    return await this.urlRepository.find({ appKey: appKey });
  }

  async getList(urlId: any): Promise<PerformanceEntity[]> {
    return await this.performanceRepository.find({ url: urlId });
  }
}
