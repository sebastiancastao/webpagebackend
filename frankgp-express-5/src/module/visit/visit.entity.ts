// src/module/visit/visit.entity.ts
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

@Entity("visits")
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  visitedAt: Date;

  @Column()
  path: string;
}
