import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";

@Module({
  imports: [
    ElasticsearchModule.register({
      node: "http://localhost:9200",
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private searchService: SearchService) {}
  onModuleInit() {
    this.searchService.createIndex();
  }
}
