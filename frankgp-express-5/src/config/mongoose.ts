// src/config/mongoose.ts
import mongoose from "mongoose";
import { ENV_MONGO } from "./envs";

export const connectMongo = async () => {
  try {
    await mongoose.connect(ENV_MONGO.URI);
    console.info("🍃 MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error;
  }
};
