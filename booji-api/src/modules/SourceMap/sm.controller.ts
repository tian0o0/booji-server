import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { SmService } from "./sm.service";

@ApiBearerAuth()
@ApiUseTags("sourcemap")
@Controller()
export class SmController {
  constructor(private smService: SmService) {}

  @ApiOperation({ title: "上传sourcemap" })
  @Post("booji/sourcemap")
  @UseInterceptors(FilesInterceptor("files"))
  @HttpCode(204)
  report(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any
  ): void {
    this.smService.upload(files, body);
  }

  @ApiOperation({ title: "获取archive列表" })
  @Get("archive/list")
  listArchive(@Query("appKey") appKey: string) {
    return this.smService.listArchive(appKey);
  }

  @ApiOperation({ title: "获取sourcemap列表" })
  @Get("sourcemap/list")
  listSourceMap(
    @Query("appKey") appKey: string,
    @Query("release") release: string
  ) {
    return this.smService.listSourceMap(appKey, release);
  }

  @ApiOperation({ title: "解析sourcemap", deprecated: true })
  @Get("sourcemap/parse")
  parse() {
    const STACK = `
      ReferenceError: noerror is not defined
        at t (main.min.js:1:515)
        at Object.<anonymous> (main.min.js:1:523)
        at r (main.min.js:1:101)
        at main.min.js:1:477
        at main.min.js:1:486
    `;
    return this.smService.parseSourceMap({
      appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3",
      stack: STACK,
      row: 1,
      col: 515,
      release: "1.0.0",
    });
  }
}
