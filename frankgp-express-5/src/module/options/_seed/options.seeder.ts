// import { OptionsEntity } from "../../module/options/options.entity";
// import { AppDataSource } from "../../config/typeOrmConfig";

import { AppDataSource } from "../../../config/typeOrmConfig";
import { OptionsEntity } from "../../../module/options/options.entity";

export const seedOptions = async () => {
  try {
    const repo = AppDataSource.getRepository(OptionsEntity);

    const options = [
      {
        key: "site_title",
        type: "string",
        value: "Mi Sitio Web",
      },
      {
        key: "maintenance_mode",
        type: "boolean",
        value: "false",
      },
      {
        key: "support_email",
        type: "string",
        value: "soporte@example.com",
      },
    ];

    for (const opt of options) {
      const existing = await repo.findOneBy({ key: opt.key });
      if (!existing) {
        await repo.save(repo.create(opt));
        console.info(`✔️ Inserted: ${opt.key}`);
      } else {
        console.info(`⚠️ Already exists: ${opt.key}`);
      }
    }

    console.info("✅ Seed complete");
  } catch (error) {
    console.error("❌ Seed failed", error);
    process.exit(1);
  }
};
