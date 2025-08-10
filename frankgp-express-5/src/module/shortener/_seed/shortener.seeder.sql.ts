import * as fs from "fs";
import * as path from "path";
import { AppDataSource } from "../../../config/typeOrmConfig";

export const ShortenerSeedSQL = async () => {
  try {
    const sqlPath = path.resolve(__dirname, "sortener.seeder.sql");
    const query = fs.readFileSync(sqlPath, "utf-8");

    // await AppDataSource.initialize();
    await AppDataSource.query(query);

    console.info("✅ Shortener SQL seed complete");
    // await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Shortener SQL seed failed", error);
    process.exit(1);
  }
};
 