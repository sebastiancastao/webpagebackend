import { AppDataSource } from "../../../../config/typeOrmConfig";
import { CategoryEntity } from "../dtos-entities/category.entity";
import categoryData from "./categories.data.json";

export const seedAcademyCategory = async () => {
  const repo = AppDataSource.getRepository(CategoryEntity);

  const count = await repo.count();

  if (count === 0) {
    await repo.save(categoryData);
    console.info("🌱 CategorySeeder seed complete ✅");
  } else {
    console.info("ℹ️ CategorySeeder table already has data. Seed skipped.");
  }
};
