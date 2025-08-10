// src/module/shortener/entities/shortener.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ShortenerVisitEntity } from "./shortener-visit.entity";

@Entity({ name: "shortener" })
export class ShortenerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  backHalf: string;

  @Column()
  destination: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ShortenerVisitEntity, (visit) => visit.shortener)
  visits: ShortenerVisitEntity[];
}
