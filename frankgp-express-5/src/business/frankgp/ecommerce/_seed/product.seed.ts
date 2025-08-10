import { AppDataSource } from "../../../../config/typeOrmConfig";
import { ProductEntity } from "../product/product.entity";
import data from "./product.data.json";

export const seedProduct = async () => {
  const repo = AppDataSource.getRepository(ProductEntity);

  const count = await repo.count();

  if (count === 0) {
    await repo.save(data);
    console.info("🌱 productSeeder seed complete ✅");
  } else {
    console.info("ℹ️ productSeeder table already has data. Seed skipped.");
  }
};
