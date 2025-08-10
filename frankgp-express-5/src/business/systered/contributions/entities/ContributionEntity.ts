// src/business/systered/contributions/entities/ContributionEntity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ContributionUserEntity } from "./UserEntity";
import { ContributionPeriodEntity } from "./PeriodEntity";

export enum FundType {
  FONDO1 = "FONDO1",
  FONDO2 = "FONDO2",
}

@Entity("contributions")
export class ContributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: FundType })
  fundType: FundType; // FONDO1 o FONDO2

  @Column({ type: "int" })
  valuePerQuota: number; // 20000 o 50000

  @Column({ type: "int" })
  totalQuotas: number; // normalmente 27 o menos si entra después

  @Column({ type: "int" })
  totalAmount: number; // calculado (valuePerQuota * totalQuotas)

  @ManyToOne(() => ContributionUserEntity, (user) => user.contributions)
  user: ContributionUserEntity;

  @ManyToOne(() => ContributionPeriodEntity, (period) => period.contributions)
  period: ContributionPeriodEntity;
}
