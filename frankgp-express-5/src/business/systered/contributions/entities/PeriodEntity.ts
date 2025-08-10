// src/business/systered/contributions/entities/PeriodEntity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ContributionEntity } from "./ContributionEntity";
import { ContributionPayoutEntity } from "./PayoutEntity";

@Entity("contributions_periods")
export class ContributionPeriodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ej: "Sept 2024 - Ago 2025"

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ default: 27 })
  totalQuotas: number;

  @OneToMany(() => ContributionEntity, (contrib) => contrib.period)
  contributions: ContributionEntity[];

  @OneToMany(() => ContributionPayoutEntity, (payout) => payout.period)
  payouts: ContributionPayoutEntity[];
}
