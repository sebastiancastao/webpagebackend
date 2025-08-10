import { ContributionEntity } from "./ContributionEntity";
import { ContributionPaymentHistoryEntity } from "./PaymentHistoryEntity";
import { ContributionPayoutEntity } from "./PayoutEntity";
import { ContributionPeriodEntity } from "./PeriodEntity";
import { SavingsAccountEntity } from "./SavingsAccountEntity";
import { SavingsPlanEntity } from "./SavingsPlanEntity";
import { TransactionEntity } from "./TransactionEntity";
import { ContributionUserEntity } from "./UserEntity";

export const contributions_entities = [
  ContributionEntity,
  ContributionPaymentHistoryEntity,
  ContributionPayoutEntity,
  ContributionPeriodEntity,
  ContributionUserEntity,

  // 
  SavingsAccountEntity,
  SavingsPlanEntity,
  TransactionEntity
];
