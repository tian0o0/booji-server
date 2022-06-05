import { ProjectEntity } from "@modules/Project/project.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("sm")
export class SmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "版本",
  })
  release: string;

  @Column({
    comment: "文件baseURL",
  })
  url: string;

  @Column("simple-array", {
    comment: "打包后的.js和.map文件",
  })
  dist: string[];

  @ManyToOne(() => ProjectEntity, (project) => project.sourcemaps)
  @JoinColumn({
    name: "appKey",
  })
  project: ProjectEntity;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
