// src/seed/shortener/shortener.seed.ts
import data from "./shortener.data.json";
import Shortener from "../../../module/shortener/models/shortener.model"; // modelo mongoose

export const seedShortener = async () => {
  const count = await Shortener.countDocuments();

  if (count === 0) {
    await Shortener.insertMany(data);
    console.info("🌱 shortenerSeeder seed complete ✅");
  } else {
    console.info("ℹ️ shortenerSeeder already has data. Seed skipped.");
  }
};
