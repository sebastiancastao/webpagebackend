import { runSeeders } from "../../config/seeder";
import { AppDataSource } from "../../config/typeOrmConfig";

export class DBConfigService {
  async dropAndSync() {
    const connection = AppDataSource;

    if (!connection.isInitialized) {
      await connection.initialize();
    }

    console.info("🧨 Dropping schema...");
    await connection.dropDatabase();

    console.info("🔁 Synchronizing schema...");
    await connection.synchronize();

    return { message: "Schema dropped and synchronized successfully" };
  }

  async dropAndSeed() {
    await this.dropAndSync();
    await runSeeders();
  }

  async runSQLQuery(query: string) {
    const connection = AppDataSource;

    if (!connection.isInitialized) {
      await connection.initialize();
    }

    try {
      const result = await connection.query(query);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
