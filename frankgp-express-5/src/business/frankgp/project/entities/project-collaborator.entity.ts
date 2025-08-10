import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { ProjectSkillEntity } from "./project-skill.entity";
import { ProjectUserEntity } from "./user.entity";
import { ProjectEntity } from "./project.entity";

@Entity("project_collaborator")
export class CollaboratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  roles: string[];

  @ManyToMany(() => ProjectSkillEntity, { cascade: true, eager: true })
  @JoinTable()
  skillsUsed: ProjectSkillEntity[];

  @ManyToOne(() => ProjectUserEntity, { cascade: true, eager: true })
  user: ProjectUserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.collaborators)
  project: ProjectEntity;
}
