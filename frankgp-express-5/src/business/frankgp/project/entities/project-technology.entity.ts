import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity('project_technology')
export class TechnologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => ProjectEntity, (project) => project.technologies)
  projects: ProjectEntity[];
}
