import { ProjectEntity } from "@modules/Project/project.entity";
import { ProjectModule } from "@modules/Project/project.module";
import { SearchModule } from "@modules/Search/search.module";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotifyService } from "./notify.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), SearchModule],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {
  constructor(private notifyService: NotifyService) {
    this.notifyService.init();
  }
}
