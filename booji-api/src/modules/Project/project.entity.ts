import { IssueEntity } from "@modules/Issue/issue.entity";
import { UrlEntity } from "@modules/Performance/performance.entity";
import { SmEntity } from "@modules/SourceMap/sm.entity";
import { UserEntity } from "@modules/User/user.entity";
import { Platform } from "@type/index";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("project")
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "项目唯一标识",
  })
  @Generated("uuid")
  appKey: string;

  @Column({
    comment: "项目名",
  })
  name: string;

  @Column({
    comment: "平台",
    default: Platform.JavaScript,
  })
  platform: Platform;

  @Column({
    comment: "备注",
    nullable: true,
  })
  desc: string;

  @Column({
    comment: "告警规则（分钟）",
    default: 1,
  })
  ruleMinute: number;

  @Column({
    comment: "告警规则（频率）",
    default: 1,
  })
  ruleCount: number;

  @OneToMany(() => IssueEntity, (issue) => issue.project)
  issues: IssueEntity[];

  @ManyToMany(() => UserEntity, (user) => user.projects)
  users: UserEntity[];

  @OneToMany(() => UrlEntity, (url) => url.project)
  urls: UrlEntity[];

  @OneToMany(() => SmEntity, (sm) => sm.project)
  sourcemaps?: SmEntity[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
