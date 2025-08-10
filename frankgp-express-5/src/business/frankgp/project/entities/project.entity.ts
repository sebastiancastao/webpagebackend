import { Column, Entity, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { ProjectImageEntity } from "./project-image.entity";
import { ProjectLinkEntity } from "./project-link.entity";
import { TechnologyEntity } from "./project-technology.entity";
import { CollaboratorEntity } from "./project-collaborator.entity";
import { ProjectDates } from "./project-dates.embeddable";

export enum ProjectArchitecture {
  MONOLITHIC = "Monolithic",
  MICROSERVICES = "Microservices",
  MODULAR = "Modular",
  SERVERLESS = "Serverless",
  CLEAN = "Clean",
  HEXAGONAL = "Hexagonal",
}

@Entity("project")
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column("simple-array")
  tags: string[];

  @Column({
    type: "enum",
    enum: ProjectArchitecture,
    default: ProjectArchitecture.MONOLITHIC,
  })
  architecture: ProjectArchitecture;

  @OneToMany(() => ProjectImageEntity, (image) => image.project, {
    cascade: true,
    eager: true,
  })
  images: ProjectImageEntity[];

  @Column(() => ProjectDates)
  dates: ProjectDates;

  @OneToMany(() => ProjectLinkEntity, (link) => link.project, {
    cascade: true,
    eager: true,
  })
  links: ProjectLinkEntity[];

  @Column({ nullable: true })
  youtube: string;

  @ManyToMany(() => TechnologyEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  technologies: TechnologyEntity[];

  @OneToMany(() => CollaboratorEntity, (collab) => collab.project, {
    cascade: true,
    eager: true,
  })
  collaborators: CollaboratorEntity[];
}
