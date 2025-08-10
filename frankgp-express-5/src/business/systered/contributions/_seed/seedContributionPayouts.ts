import { ContributionPayoutEntity } from "../entities/PayoutEntity";
import { ContributionUserEntity } from "../entities/UserEntity";
import { ContributionPeriodEntity } from "../entities/PeriodEntity";
import { AppDataSource } from "../../../../config/typeOrmConfig";

export async function seedContributionPayouts() {
  const payoutRepo = AppDataSource.getRepository(ContributionPayoutEntity);
  const userRepo = AppDataSource.getRepository(ContributionUserEntity);
  const periodRepo = AppDataSource.getRepository(ContributionPeriodEntity);

  // console.log("🌱 Iniciando seed de Contribution Payouts...");

  const existing = await payoutRepo.count();
  if (existing > 0) {
    console.log(`⚠️ Ya existen ${existing} payouts, omitiendo seed.`);
    return;
  }

  const users = await userRepo.find();
  const periods = await periodRepo.find();

  if (users.length === 0 || periods.length === 0) {
    console.error("❌ No hay usuarios o periodos para asociar payouts. Ejecuta primero sus seeds.");
    return;
  }

  // Tomamos el primer periodo para todos los pagos de ejemplo
  const periodo = periods[0];
  const cuotaFondo1 = 20000;
  const cuotaFondo2 = 50000;

  const payouts = users.map((user, index) => {
    const puesto = index + 1;
    const cuotasAsignadas = 2; // Ejemplo, podrían variar
    const totalPayment = cuotaFondo2 * cuotasAsignadas;

    // Simular que cada pago ocurre el segundo viernes del mes siguiente al puesto
    const paymentDate = new Date(periodo.startDate);
    paymentDate.setMonth(paymentDate.getMonth() + puesto);
    paymentDate.setDate(paymentDate.getDate() + (12 - paymentDate.getDay())); // ajustar a viernes aprox.

    return payoutRepo.create({
      puesto,
      paymentDate,
      cuotaFondo1,
      cuotaFondo2,
      totalPayment,
      user,
      period: periodo,
    });
  });

  await payoutRepo.save(payouts);

  console.log("🌱 contributionPayoutsSeeder seed complete ✅");
}
