import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  RelationId,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "@modules/User/user.entity";
import { ProjectEntity } from "@modules/Project/project.entity";
import { TagEntity } from "@modules/Tag/tag.entity";

export enum Status {
  ToBeHandled,
  Handling,
  Handled,
  Closed,
  Reopened,
  Ignored,
}

export enum Severity {
  Critical = "critical",
  Error = "error",
  Warn = "warn",
  Info = "info",
  Log = "log",
}

@Entity("issue")
export class IssueEntity {
  @PrimaryColumn()
  issueId: string;

  @Column({
    default: Status.ToBeHandled,
  })
  status: Status;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  level: Severity;

  @Column()
  message: string;

  @Column({
    comment: "错误栈，用于解析sourcemap",
    type: "longtext",
    nullable: true,
  })
  stack: string;

  @Column({
    comment: "错误所在行",
    default: 0,
  })
  row: number;

  @Column({
    comment: "错误所在列",
    default: 0,
  })
  col: number;

  @Column({
    comment: "解析sourcemap后的得到的原始错误串",
    default: "",
  })
  source: string;

  @Column({
    comment: "release版本，用于寻找对应版本的sourcemap",
    default: "",
  })
  release: string;

  @Column({
    default: 1,
  })
  eventCount: number;

  @Column("simple-array")
  users: string[];

  @ManyToOne(() => ProjectEntity, (project) => project.issues)
  @JoinColumn({
    name: "project",
  })
  project: ProjectEntity;

  @RelationId((issue: IssueEntity) => issue.project)
  appKey?: string;

  @ManyToOne(() => UserEntity, (user) => user.issues)
  assignee?: UserEntity;

  // 不用指定relations就可自动加载assigneeId
  @RelationId((issue: IssueEntity) => issue.assignee)
  assigneeId?: number;

  @OneToMany(() => TagEntity, (tag) => tag.issue, {
    eager: true,
    cascade: true,
  })
  tags: TagEntity[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
