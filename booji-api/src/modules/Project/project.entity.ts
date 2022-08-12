import { IssueEntity } from "@modules/Issue/issue.entity";
import {
  PerformanceEntity,
  UrlEntity,
} from "@modules/Performance/performance.entity";
import { SmEntity } from "@modules/SourceMap/sm.entity";
import { UserEntity } from "@modules/User/user.entity";
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

enum Platform {
  JavaScript = "js",
  Vue = "vue",
  Angular = "angular",
  React = "react",
  Mp = "mp",
}

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
