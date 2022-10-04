import { Injectable } from "@nestjs/common";
// DELETE
// import { REQUEST } from "@nestjs/core";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
import {
  ensureFileSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  existsSync,
} from "fs-extra";
import { createReadStream } from "fs";
import * as path from "path";
import { compare } from "compare-versions";
import { ConfigService } from "@nestjs/config";
const StackTracey = require("stacktracey");
const sourceMap = require("source-map");
const SourceMapConsumer = sourceMap.SourceMapConsumer;

@Injectable()
export class SmService {
  constructor(
    // DELETE
    // @InjectRepository(SmEntity)
    // private readonly smRepository: Repository<SmEntity>,
    // @Inject(REQUEST)
    // private readonly req: any,
    private configService: ConfigService
  ) {}

  get staticUrl() {
    return this.configService.get("static");
  }

  async upload(files: Array<Express.Multer.File>, { appKey, release }: any) {
    files.forEach((file) => {
      const filepath = path.join(
        __dirname,
        "../../..",
        `static/${appKey}/${release}/${file.originalname}`
      );
      ensureFileSync(filepath);
      writeFileSync(filepath, file.buffer);
    });
  }

  async listArchive(appKey: string): Promise<string[]> {
    const filepath = path.join(__dirname, "../../..", `static/${appKey}`);
    if (!existsSync(filepath)) return [];
    const archiveList = readdirSync(filepath);
    archiveList.sort((a, b) => {
      if (compare(a, b, "<")) {
        return 1;
      } else if (compare(a, b, ">")) {
        return -1;
      } else {
        return 0;
      }
    });
    return archiveList;
  }

  async listSourceMap(appKey: string, release: string): Promise<string[]> {
    const filepath = path.join(
      __dirname,
      "../../..",
      `static/${appKey}/${release}`
    );
    if (!existsSync(filepath)) return [];
    const files = readdirSync(filepath);
    return files.map(
      (file) => `${this.staticUrl}/${appKey}/${release}/${file}`
    );
  }

  download(url: string) {
    const p = url.split("static")[1];
    const filepath = path.join(__dirname, "../../../static", p);
    return createReadStream(filepath);
  }

  async parseSourceMap({ appKey, stack, release }: any): Promise<string> {
    if (!stack) return "";

    const latestRelease = release || this.listArchive(appKey)[0];
    const dirpath = path.join(
      __dirname,
      "../../..",
      `static/${appKey}/${latestRelease}`
    );
    if (!existsSync(dirpath)) return "";
    const smList = readdirSync(dirpath);

    // 找到当前appKey/release(默认取最新的release, 如果booji SDK初始化时传了release，那么根据传入的release寻找)
    if (!smList.length) return "";

    const promises = smList.map(async (file) => {
      const fileUrl = dirpath + "/" + file;
      const fileContent = readFileSync(fileUrl).toString();
      const consumer = await new SourceMapConsumer(fileContent);
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

    try {
      const data = await Promise.all(promises);
      return data[0];
    } catch (e) {
      console.log("SourceMap解析失败，请确保可以访问SourceMap文件");
      return "";
    }
  }
}
