import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectUserEntity } from "./user.entity";

@Entity("project_user_skills")
export class SkillUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => ProjectUserEntity, (user) => user.skills)
  users: ProjectUserEntity[];
}
