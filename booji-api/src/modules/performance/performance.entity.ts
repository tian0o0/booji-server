import { ProjectEntity } from "@modules/Project/project.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("url")
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ProjectEntity, (project) => project.urls)
  @JoinColumn({
    name: "projectId",
  })
  project: ProjectEntity;

  @Column()
  appKey: string;

  @OneToMany(() => PerformanceEntity, (p) => p.url)
  performances: PerformanceEntity[];
}

@Entity("performance")
export class PerformanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dns: number;

  @Column()
  tcp: number;

  @Column()
  request: number;

  @Column()
  response: number;

  @Column()
  processing: number;

  @Column()
  load: number;

  @ManyToOne(() => UrlEntity, (url) => url.performances)
  @JoinColumn({
    name: "urlId",
  })
  url: UrlEntity;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;
}
