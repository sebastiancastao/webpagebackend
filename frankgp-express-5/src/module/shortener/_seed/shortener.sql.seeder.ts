import data from "./shortener.data.json";
import { AppDataSource } from "../../../config/typeOrmConfig";
import { ShortenerEntity } from "../../../module/shortener/entities/shortener.entity";

export const seedShortener = async () => {
  const repo = AppDataSource.getRepository(ShortenerEntity);

  const count = await repo.count();

  if (count === 0) {
    await repo.save(data);
    console.info("🌱 shortenerSeeder seed complete ✅");
  } else {
    console.info("ℹ️ shortenerSeeder table already has data. Seed skipped.");
  }
};
