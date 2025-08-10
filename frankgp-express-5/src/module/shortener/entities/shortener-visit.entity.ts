// src/module/shortener/entities/shortener-visit.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ShortenerEntity } from "./shortener.entity";

@Entity("shortener_visit")
export class ShortenerVisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  device: string;

  @CreateDateColumn()
  visitedAt: Date;

  @ManyToOne(() => ShortenerEntity, (shortUrl) => shortUrl.visits, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shortenerId" })
  shortener: ShortenerEntity;

  @Column()
  shortenerId: number;
}
