import { IssueEntity } from "@modules/Issue/issue.entity";
import { NotifyModule } from "@modules/Notify/notify.module";
import { ProjectEntity } from "@modules/Project/project.entity";
import { ProjectModule } from "@modules/Project/project.module";
import { SearchModule } from "@modules/Search/search.module";
import { TagModule } from "@modules/Tag/tag.module";
import { Global, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaService } from "./kafka.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([IssueEntity, ProjectEntity]),
    ProjectModule,
    SearchModule,
    TagModule,
    NotifyModule,
  ],
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
