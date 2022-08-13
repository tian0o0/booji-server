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

export interface PerformanceData {
  axis: Date[];
  dns: number[];
  tcp: number[];
  request: number[];
  response: number[];
  processing: number[];
  load: number[];
  average: {
    dns: number;
    tcp: number;
    request: number;
    response: number;
    processing: number;
    load: number;
  };
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

  async getList(urlId: any): Promise<PerformanceData> {
    const data = await this.performanceRepository.find({ url: urlId });
    return transformRowData(data);
  }
}

function transformRowData(arr: PerformanceEntity[]): PerformanceData {
  let res: PerformanceData = {
    axis: [],
    dns: [],
    tcp: [],
    request: [],
    response: [],
    processing: [],
    load: [],
    average: {
      dns: 0,
      tcp: 0,
      request: 0,
      response: 0,
      processing: 0,
      load: 0,
    },
  };
  arr.forEach((item) => {
    res.axis.push(item.createdAt);
    res.dns.push(item.dns);
    res.tcp.push(item.tcp);
    res.request.push(item.request);
    res.response.push(item.response);
    res.processing.push(item.processing);
    res.load.push(item.load);
    res.average.dns = calcAverage(res.dns);
    res.average.tcp = calcAverage(res.tcp);
    res.average.request = calcAverage(res.request);
    res.average.response = calcAverage(res.response);
    res.average.processing = calcAverage(res.processing);
    res.average.load = calcAverage(res.load);
  });

  return res;
}

function calcAverage(nums: number[]) {
  return nums.reduce((a, b) => a + b) / nums.length;
}
