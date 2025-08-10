// src/business/systered/contributions/entities/PaymentHistoryEntity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ContributionUserEntity } from "./UserEntity";
import { ContributionEntity } from "./ContributionEntity";

@Entity("contributions_payment_history")
export class ContributionPaymentHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  paymentDate: Date;

  @Column({ type: "int" })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ContributionUserEntity)
  user: ContributionUserEntity;

  @ManyToOne(() => ContributionEntity)
  contribution: ContributionEntity;
}
