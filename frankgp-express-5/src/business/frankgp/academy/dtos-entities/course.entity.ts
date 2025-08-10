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
import { CategoryEntity } from "./category.entity";

@Entity("academy_courses")
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column({ length: 255 })
  title: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column("text", { nullable: true })
  description: string | null;

  @ManyToOne(() => CategoryEntity, (category) => category.courses, { nullable: true })
  category: CategoryEntity;

  @OneToMany(() => SectionEntity, (section) => section.course)
  sections: SectionEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
