// src/module/info/info.controller.ts

import { AppDataSource } from "../../config/typeOrmConfig";
import { OptionsEntity } from "../options/options.entity";
import { Request, Response } from "express";
import os from "os";
import "dotenv/config";
import { visitDataMock } from "../../middleware/visit.middleware";

export class InfoController {
  async info(req: Request, res: Response) {
    const { count, date, time } = await getBootInfo();
    const visitCount = visitDataMock.length;

    const info = {
      "Visit Count": visitCount,
      "Boot Count": count,
      "Last Boot Date": date,
      "Last Boot Time": time,
      "Server Time": new Date().toLocaleString(),
      "Node.js Version": process.version,
      "Operating System": os.platform(),
      "OS Architecture": os.arch(),
      "CPU Cores": os.cpus().length,
      "Free Memory": (os.freemem() / 1024 ** 3).toFixed(2) + " GB",
      "Total Memory": (os.totalmem() / 1024 ** 3).toFixed(2) + " GB",
      "Host Name": os.hostname(),
      Uptime: formatUptime(os.uptime()),
      "Environment Variables": {
        PORT: process.env.PORT,
        SEED_DATA: process.env.SEED_DATA,
        DROPSCHEMA: process.env.DROPSCHEMA,
        DEV_MODE: process.env.DEV_MODE,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_TYPE: process.env.DB_TYPE,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
      },
    };

    res.json(info);
  }
}

async function getBootInfo() {
  const repo = AppDataSource.getRepository(OptionsEntity);

  const countOpt = await repo.findOneBy({ key: "boot_counter" });
  const dateOpt = await repo.findOneBy({ key: "boot_counter_date" });
  const timeOpt = await repo.findOneBy({ key: "boot_last_time" });

  return {
    count: countOpt ? parseInt(countOpt.value, 10) : 0,
    date: dateOpt?.value || "N/A",
    time: timeOpt?.value || "N/A",
  };
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
