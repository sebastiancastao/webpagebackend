// src/module/stat/entities/stat.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("stat")
export class StatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: true })
  currentURL: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  referrerURL: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  countryName: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  utcOffset: string;

  @Column({ nullable: true })
  countryCallingCode: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  currencyName: string;

  @Column({ nullable: true })
  languages: string;

  @Column({ type: "bigint", nullable: true })
  countryPopulation: number;

  @Column({ nullable: true })
  org: string;

  @Column({ nullable: true })
  rawTime: string; // May 17, 2025 at 19:31

  @CreateDateColumn()
  createdAt: Date;
}
