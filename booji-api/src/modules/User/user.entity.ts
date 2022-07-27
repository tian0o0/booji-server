import { IssueEntity } from "@modules/Issue/issue.entity";
import { ProjectEntity } from "@modules/Project/project.entity";
import { encrypt } from "@utils/crypto";
import { IsEmail } from "class-validator";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "用户名",
  })
  name: string;

  @Column({
    nullable: false,
    comment: "邮箱",
  })
  @IsEmail()
  email: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column({
    select: false,
    comment: "密码",
  })
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = encrypt(this.password);
  }

  @OneToMany(() => IssueEntity, (issue) => issue.assignee)
  issues: IssueEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  @JoinTable({
    name: "users_projects",
  })
  projects: ProjectEntity[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}
