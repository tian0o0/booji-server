import { ProjectEntity } from "@modules/Project/project.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("performance")
export class PerformanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

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

  @ManyToOne(() => ProjectEntity, (project) => project.performances)
  project: ProjectEntity;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;
}
