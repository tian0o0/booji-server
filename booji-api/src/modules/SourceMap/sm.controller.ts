import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SmService } from "./sm.service";

@Controller("sourcemap")
export class SmController {
  constructor(private smService: SmService) {}

  @ApiOperation({ title: "上传sourcemap" })
  @Post()
  @HttpCode(204)
  report(@Body() body: any): void {
    this.smService.upload(body);
  }

  @ApiOperation({ title: "获取sourcemap列表" })
  @Get("list")
  list(@Query("appKey") appKey: string) {
    return this.smService.list(appKey);
  }

  @ApiOperation({ title: "解析sourcemap" })
  @Get("parse")
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
