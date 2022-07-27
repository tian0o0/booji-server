import { IssueEntity } from "@modules/Issue/issue.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type TagKey =
  | "browser"
  | "engine"
  | "os"
  | "type"
  | "country"
  | "region"
  | "city";

@Entity("tag")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: TagKey;

  @Column()
  value: string;

  @Column({
    default: 1,
  })
  count: number;

  @ManyToOne(() => IssueEntity, (issue) => issue.tags)
  @JoinColumn({
    name: "fk_issue_id",
  })
  issue: IssueEntity;

  @Column()
  issueId: string;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
