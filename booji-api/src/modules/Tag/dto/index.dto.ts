import { TagKey } from "../tag.entity";

export class CreateTagDto {
  readonly key: TagKey;
  readonly value: string;
}
