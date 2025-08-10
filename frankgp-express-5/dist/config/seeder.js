"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = void 0;
const typeOrmConfig_1 = require("../config/typeOrmConfig");
const runSeeders = async () => {
    const connection = typeOrmConfig_1.AppDataSource;
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
exports.runSeeders = runSeeders;
//# sourceMappingURL=seeder.js.map