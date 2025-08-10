import { AppDataSource } from "../config/typeOrmConfig";
import { seedWardrobes } from "../business/ivanaapps/_seed/wardrobe.seed";
import { seedOptions } from "../module/options/_seed/options.seeder";
import { seedShortener } from "../module/shortener/_seed/shortener.sql.seeder";
import { seedProjectUser } from "../business/frankgp/project/_seed/project-user.seed";
import { seedProject } from "../business/frankgp/project/_seed/project.seed";
import { seedProduct } from "../business/frankgp/ecommerce/_seed/product.seed";
import { seedAcademyCategory } from "../business/frankgp/academy/_seed/categories.seed";
import { seedAcademySection } from "../business/frankgp/academy/_seed/sections.seed";
import { seedRestaurant } from "../business/systered/food/seed/restaurant.seed";
import { runSeedersContributions } from "../business/systered/contributions/_seed/_seed.contributions";
import { seedUserSQL } from "../auth/_seed/user.seed";

export const runSeeders = async () => {
  const connection = AppDataSource;

  if (!connection.isInitialized) {
    await connection.initialize();
  }

  // 🌱 Ejecutar seeders ✅

  // await seedUserMongoDB();
  // await seedUserSQL();

  // await seedOptions();
  // await seedShortener();

  // await seedProjectUser();
  // await seedProject();
  // await seedProduct();

  // await seedAcademyCategory();
  // await seedAcademySection();

  // await seedWardrobes();
  // await seedRestaurant();

  // await runSeedersContributions();

  return { message: "Seeders executed successfully" };
};
