import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson.entity";
// import { ProjectEntity } from "./project.entity";

@Entity("academy_lesson_link")
export class LessonLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => LessonEntity, (project) => project.links)
  lesson: LessonEntity;
}
