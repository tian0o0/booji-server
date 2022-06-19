import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { Request } from "express";
import axios from "axios";
import { SmEntity } from "./sm.entity";
const StackTracey = require("stacktracey");
const sourceMap = require("source-map");
const SourceMapConsumer = sourceMap.SourceMapConsumer;

@Injectable()
export class SmService {
  constructor(
    @InjectRepository(SmEntity)
    private readonly smRepository: Repository<SmEntity>,
    @Inject(REQUEST)
    private readonly req: Request
  ) {}

  async upload(body: any): Promise<SmEntity> {
    const { release, url, dist } = body;
    // 1.如果release下已存在dist，清空dist重新上传
    // 2.如果release下不存在dist，直接上传dist
    const sm = await this.smRepository.findOne({ release });
    if (sm) {
      sm.dist = dist;
      return await this.smRepository.save(sm);
    }

    let newSm = new SmEntity();
    newSm.project = this.req.project;
    newSm.release = release;
    newSm.url = url;
    newSm.dist = dist;

    return await this.smRepository.save(newSm);
  }

  async list(appKey: string) {
    const [data, count] = await getRepository(SmEntity)
      .createQueryBuilder("sm")
      .where("sm.project = :appKey", { appKey })
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async parseSourceMap({ appKey, stack, release }: any): Promise<string> {
    if (!stack) return "";

    // 找到当前appKey/release(默认取最新的release, 如果booji SDK初始化时传了release，那么根据传入的release寻找)
    const smList = await this.smRepository.find({ project: appKey });

    const sm =
      smList.find((sm) => sm.release === release) || smList[smList.length - 1];

    if (!sm?.dist.length) return "";

    const promises = sm.dist.map(async (file) => {
      const fileUrl = sm.url + file;
      const res = await axios.get(fileUrl);
      const fileContent = res.data;
      const consumer = await new SourceMapConsumer(fileContent);

      // const originalPosition = consumer.originalPositionFor({
      //   // line: row,
      //   // column: col,
      // });
      // if (!originalPosition.source || originalPosition.column === 0) return "";

      // const sourceContent = consumer.sourceContentFor(originalPosition.source);
      // return sourceContent;
      const tracey = new StackTracey(stack);
      for (const frame of tracey.items) {
        // 这里的frame就是stack中的一行所解析出来的内容
        // originalPosition不仅仅是行列信息，还有错误发生的文件 originalPosition.source
        const originalPosition = consumer.originalPositionFor({
          line: frame.line,
          column: frame.column,
        });
        const sourceContent = consumer.sourceContentFor(
          originalPosition.source
        );
        return sourceContent;
      }
    });

    const data = await Promise.all(promises);

    return data[0];
  }
}
