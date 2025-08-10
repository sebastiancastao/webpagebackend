// src/business/systered/contributions/entities/UserEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ContributionEntity } from "./ContributionEntity";
import { ContributionPayoutEntity } from "./PayoutEntity";
import { UserRoleEnum } from "../../../../auth/enum/roles.enum";
import { SavingsAccountEntity } from "./SavingsAccountEntity";

@Entity("savings_users")
export class ContributionUserEntity {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  documentNumber: string; // DNI, RUC, etc.

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ select: true, nullable: true })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({
    type: "enum",
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  googleId: string;

  @Column({ length: 100, nullable: true })
  displayName: string;

  @Column({ type: "text", nullable: true })
  rawGoogle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ContributionEntity, (contrib) => contrib.user)
  contributions: ContributionEntity[];

  @OneToMany(() => ContributionPayoutEntity, (payout) => payout.user)
  payouts: ContributionPayoutEntity[];

  @OneToMany(() => SavingsAccountEntity, account => account.customer)
  accounts: SavingsAccountEntity[];
}
