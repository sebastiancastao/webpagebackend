import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CourseEntity } from "./course.entity";

@Entity("academy_categories")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column("text", { nullable: true })
  description: string | null;

  @OneToMany(() => CourseEntity, (course) => course.category,{
    onDelete: "CASCADE",
    eager: true,
    cascade: true
  })
  courses: CourseEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
