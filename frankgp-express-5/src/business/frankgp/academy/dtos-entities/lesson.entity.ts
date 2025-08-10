import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SectionEntity } from "./section.entity";
import { LessonLinkEntity } from "./lesson-link.entity";
import { LessonLinkPremiumEntity } from "./lesson-link-premium.entity";

@Entity("academy_lessons")
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({ length: 255, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  labelLesson: string;

  @Column({ length: 255, nullable: true, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  titleLesson: string;

  @Column({ type: "text", nullable: true, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  descriptionLesson: string | null;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  youtubeUrl: string;

  @Column({ nullable: true })
  vkUrl: string;

  @Column("text", { nullable: true })
  markdownUrl?: string;

  @Column("text", { nullable: true })
  markdownUrlPremium?: string;

  @OneToMany(() => LessonLinkEntity, (link) => link.lesson, {
    cascade: true,
    eager: true,
  })
  links: LessonLinkEntity[];

  @OneToMany(() => LessonLinkPremiumEntity, (link) => link.lesson, {
    cascade: true,
    eager: true,
  })
  linksPremium: LessonLinkPremiumEntity[];

  @Column({ name: "lesson_order", default: 1 })
  lessonOrder: number;

  @ManyToOne(() => SectionEntity, (section) => section.lessons, { onDelete: "CASCADE" })
  section: SectionEntity;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
