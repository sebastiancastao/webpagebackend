import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectUserEntity } from "./user.entity";
import { CollaboratorEntity } from "./project-collaborator.entity";

@Entity("project_skill")
export class ProjectSkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToMany(() => CollaboratorEntity, (collab) => collab.skillsUsed)
  collaborators: CollaboratorEntity[];
}
