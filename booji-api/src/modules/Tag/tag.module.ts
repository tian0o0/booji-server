import { IssueEntity } from "@modules/Issue/issue.entity";
import { IssueModule } from "@modules/Issue/issue.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagController } from "./tag.controller";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, IssueEntity]), IssueModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
