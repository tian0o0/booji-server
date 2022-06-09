import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get("esNode"),
      }),
      inject: [ConfigService],
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
