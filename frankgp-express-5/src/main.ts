// src/main.ts
import "reflect-metadata";
import "./module/database/database.cron";
import { AppDataSource } from "./config/typeOrmConfig";
import { countBoot } from "./utils/countBoot";
import { PORT } from "./config/envs";
import { httpServer } from "./socket";
import { connectMongo } from "./config/mongoose";
import { runSeeders } from "./config/seeder";

const startServer = async () => {
  try {
    // 🧠 Conectar MongoDB
    if (process.env.MONGO_URI) await connectMongo();

    // 🧠 Inicializar base relacional (TypeORM)
    if (process.env.DB_DATABASE) {
      await AppDataSource.initialize();
      console.info("📦 Data source initialized");

      await countBoot();

      if (process.env.SEED_DATA === "true") {
        // 🌱 Ejecutar seeders ✅
        await runSeeders();
      }
    }

    httpServer.listen(PORT, () => {
      console.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar el servidor", err);
  }
};

startServer();
