import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SavingsAccountEntity } from './SavingsAccountEntity';

@Entity('savings_plans')
export class SavingsPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // "Plan Escolar", "Plan Vivienda"

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  interestRate: number; // Ej: 5.5%

  @OneToMany(() => SavingsAccountEntity, account => account.plan)
  accounts: SavingsAccountEntity[];
}
