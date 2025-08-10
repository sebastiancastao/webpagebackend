import { seedContributionPaymentHistory } from "./seedContributionPaymentHistory";
import { seedContributionPayouts } from "./seedContributionPayouts";
import { seedContributionPeriods } from "./seedContributionPeriods";
import { seedContributions } from "./seedContributions";
import { seedContributionUsers } from "./seedContributionUsers";

export const runSeedersContributions = async () => {
  await seedContributionUsers();
  await seedContributionPeriods();
  await seedContributions();
  await seedContributionPayouts();
  await seedContributionPaymentHistory();
};
