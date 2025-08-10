import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson.entity";

@Entity("academy_lesson_link_premium")
export class LessonLinkPremiumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => LessonEntity, (project) => project.links)
  lesson: LessonEntity;
}
