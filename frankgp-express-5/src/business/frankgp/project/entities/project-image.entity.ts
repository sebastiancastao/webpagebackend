import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity("project_image")
export class ProjectImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  alt: string;

  @ManyToOne(() => ProjectEntity, (project) => project.images)
  project: ProjectEntity;
}
