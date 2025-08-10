import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { SavingsAccountEntity } from './SavingsAccountEntity';

export type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'INTEREST';

@Entity('savings_transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SavingsAccountEntity, account => account.transactions, { onDelete: 'CASCADE' })
  account: SavingsAccountEntity;

  @Column({ type: 'enum', enum: ['DEPOSIT', 'WITHDRAW', 'INTEREST'] })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  description: string;
}
