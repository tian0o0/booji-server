import { IssueEntity } from "@modules/Issue/issue.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/index.dto";
import { TagEntity } from "./tag.entity";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>
  ) {}

  async save(issueId: string, data: CreateTagDto): Promise<TagEntity> {
    if (!data.key) return;
    const tag = await this.tagRepository.findOne({ value: data.value });

    if (tag) {
      // 如果 tag 存在，此时 count + 1
      tag.count++;
      await this.tagRepository.save(tag);
    } else {
      // 如果 tag 不存在，此时新增 tag
      const newTag = new TagEntity();
      newTag.key = data.key;
      newTag.value = data.value;
      newTag.issue = await this.issueRepository.findOne(issueId);
      await this.tagRepository.save(newTag);
    }

    return await this.tagRepository.findOne({ value: data.value });
  }
}
