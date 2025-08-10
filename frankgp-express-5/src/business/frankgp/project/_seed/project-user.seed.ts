import data from "./project-user.data.json";
import { AppDataSource } from "../../../../config/typeOrmConfig";
import { ProjectUserEntity, UserLevel } from "../entities/user.entity";

const mappedData = data.map((item) => ({
  ...item,
  role: item.role as UserLevel,
}));

export const seedProjectUser = async () => {
  const repo = AppDataSource.getRepository(ProjectUserEntity);

  const count = await repo.count();

  if (count === 0) {
    await repo.save(mappedData);
    console.info("🌱 ProjectUser seed complete ✅");
  } else {
    console.info("ℹ️ ProjectUser table already has data. Seed skipped.");
  }
};
