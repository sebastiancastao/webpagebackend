import data from "./project.data.json";
import { AppDataSource } from "../../../../config/typeOrmConfig";
import { ProjectEntity } from "../entities/project.entity";

export const seedProject = async () => {
  const repo = AppDataSource.getRepository(ProjectEntity);

  const count = await repo.count();

  if (count === 0) {
    await repo.save(data);
    console.info("🌱 projectSeeder seed complete ✅");
  } else {
    console.info("ℹ️ projectSeeder table already has data. Seed skipped.");
  }
};
