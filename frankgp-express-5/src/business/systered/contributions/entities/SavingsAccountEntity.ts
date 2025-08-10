import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { TransactionEntity } from "./TransactionEntity";
import { ContributionUserEntity } from "./UserEntity";
import { SavingsPlanEntity } from "./SavingsPlanEntity";

@Entity("savings_accounts")
export class SavingsAccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column()
  currency: string; // "PEN", "USD"

  @ManyToOne(() => ContributionUserEntity, (customer) => customer.accounts, { onDelete: "CASCADE" })
  customer: ContributionUserEntity;

  @OneToMany(() => TransactionEntity, (tx) => tx.account)
  transactions: TransactionEntity[];

  @ManyToOne(() => SavingsPlanEntity, (plan) => plan.accounts)
  plan: SavingsPlanEntity;
}
