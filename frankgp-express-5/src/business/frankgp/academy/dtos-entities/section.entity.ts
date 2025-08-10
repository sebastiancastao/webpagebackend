import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CourseEntity } from "./course.entity";
import { LessonEntity } from "./lesson.entity";

@Entity("academy_sections")
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({ length: 255 })
  titleSection: string;

  @Column({ name: "section_order", default: 1 })
  sectionOrder: number;

  @ManyToOne(() => CourseEntity, (course) => course.sections, { onDelete: "CASCADE" })
  course: CourseEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.section, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  lessons: LessonEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
