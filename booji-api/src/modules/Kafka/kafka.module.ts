import { Global, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { KafkaService } from "./kafka.service";

@Global()
@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule implements OnModuleInit, OnModuleDestroy {
  constructor(private kafkaService: KafkaService) {}
  onModuleInit() {
    this.kafkaService.onModuleInit();
  }
  onModuleDestroy() {
    this.kafkaService.onModuleDestroy();
  }
}
