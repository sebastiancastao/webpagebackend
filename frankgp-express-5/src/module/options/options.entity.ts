// src/module/options/entities/options.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("options")
export class OptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  type: string;

  @Column("text")
  value: string;
}
