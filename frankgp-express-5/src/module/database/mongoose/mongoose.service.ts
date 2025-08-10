// src/module/database/db-backup.service.ts

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import mongoose from "mongoose";
import { ENV_MONGO } from "../../../config/envs";

const execAsync = promisify(exec);

export class MongooseService {
  private backupsDir = path.resolve(__dirname, "../../../../backups/db");
  private mongoUri = ENV_MONGO.URI;

  constructor() {
    if (!fs.existsSync(this.backupsDir)) {
      fs.mkdirSync(this.backupsDir, { recursive: true });
    }
  }

  public async backup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFolder = path.join(this.backupsDir, `mongo-backup-${timestamp}`);
    const dumpCommand = `mongodump --uri="${this.mongoUri}" --out="${backupFolder}"`;

    try {
      const { stdout, stderr } = await execAsync(dumpCommand);
      if (stderr) console.error("⚠️ mongodump stderr:", stderr);
      console.info("✅ mongodump stdout:", stdout);
      return backupFolder;
    } catch (error: any) {
      console.error("❌ Backup failed:", error);
      throw new Error("MongoDB backup failed");
    }
  }

  public async dropAllCollections(): Promise<string[]> {
    const db = mongoose.connection;
    const dropped: string[] = [];

    const collections = Object.keys(db.collections);
    for (const name of collections) {
      try {
        await db.dropCollection(name);
        console.info(`🗑️ Dropped: ${name}`);
        dropped.push(name);
      } catch (err: any) {
        if (err.code === 26) {
          console.warn(`⚠️ Collection not found: ${name}`);
        } else {
          console.error(`❌ Failed to drop ${name}:`, err);
          throw new Error(`Failed to drop collection ${name}`);
        }
      }
    }

    return dropped;
  }
}
