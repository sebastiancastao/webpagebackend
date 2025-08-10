import { AppDataSource } from "../../../../config/typeOrmConfig";
import { ContributionEntity, FundType } from "../entities/ContributionEntity";
import { ContributionPeriodEntity } from "../entities/PeriodEntity";
import { ContributionUserEntity } from "../entities/UserEntity";

export async function seedContributions() {
  const userRepo = AppDataSource.getRepository(ContributionUserEntity);
  const contributionRepo = AppDataSource.getRepository(ContributionEntity);
  const periodRepo = AppDataSource.getRepository(ContributionPeriodEntity);

  // console.log("🌱 Iniciando seed de Contributions...");

  // Traemos un usuario y un periodo ya existentes
  const user = await userRepo.findOne({ where: {} });
  const period = await periodRepo.findOne({ where: {} });

  if (!user || !period) {
    console.warn("⚠️ No se encontraron usuario o periodo para crear contributions");
    return;
  }

  // Creamos registros de ejemplo
  const contributions = contributionRepo.create([
    {
      user,
      period,
      fundType: FundType.FONDO1,
      valuePerQuota: 20000,
      totalQuotas: period.totalQuotas,
      totalAmount: 20000 * period.totalQuotas,
    },
    {
      user,
      period,
      fundType: FundType.FONDO2,
      valuePerQuota: 50000,
      totalQuotas: period.totalQuotas,
      totalAmount: 50000 * period.totalQuotas,
    },
  ]);

  await contributionRepo.save(contributions);

  console.log("🌱 contributionsSeeder seed complete ✅");
}
