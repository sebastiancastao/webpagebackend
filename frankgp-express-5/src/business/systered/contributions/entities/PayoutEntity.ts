// src/business/systered/contributions/entities/PayoutEntity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ContributionUserEntity } from "./UserEntity";
import { ContributionPeriodEntity } from "./PeriodEntity";

@Entity("contributions_payouts")
export class ContributionPayoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  puesto: number; // orden de pago

  @Column({ type: "date" })
  paymentDate: Date; // segundo viernes según puesto

  @Column({ type: "int" })
  cuotaFondo1: number; // 20,000

  @Column({ type: "int" })
  cuotaFondo2: number; // 50,000

  @Column({ type: "int" })
  totalPayment: number; // cuotaFondo2 * cuotasAsignadas

  @ManyToOne(() => ContributionUserEntity, (user) => user.payouts)
  user: ContributionUserEntity;

  @ManyToOne(() => ContributionPeriodEntity, (period) => period.payouts)
  period: ContributionPeriodEntity;
}
