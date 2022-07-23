import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { BinlogService } from "./binlog.service";

@Module({
  providers: [BinlogService],
  exports: [BinlogService],
})
export class BinlogModule implements OnModuleInit, OnModuleDestroy {
  constructor(private binlogService: BinlogService) {}
  onModuleInit() {
    this.binlogService.onModuleInit();
  }
  onModuleDestroy() {
    this.binlogService.onModuleDestroy();
  }
}
