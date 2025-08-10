// src/utils/countBoot.ts

import { AppDataSource } from "../config/typeOrmConfig";
import { OptionsEntity } from "../module/options/options.entity";

const getTodayDateString = () => {
  const now = new Date();
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
};

const getTimeString = () => {
  const now = new Date();
  return now.toISOString(); // Fecha y hora completa en UTC
};

export const countBoot = async () => {
  const repo = AppDataSource.getRepository(OptionsEntity);

  const BOOT_KEY = "boot_counter";
  const BOOT_DATE_KEY = "boot_counter_date";
  const BOOT_TIME_KEY = "boot_last_time";

  const today = getTodayDateString();
  const currentTime = getTimeString();

  let counterOpt = await repo.findOneBy({ key: BOOT_KEY });
  let dateOpt = await repo.findOneBy({ key: BOOT_DATE_KEY });
  let timeOpt = await repo.findOneBy({ key: BOOT_TIME_KEY });

  if (!counterOpt) {
    counterOpt = repo.create({ key: BOOT_KEY, type: "number", value: "1" });
    dateOpt = repo.create({ key: BOOT_DATE_KEY, type: "string", value: today });
  } else {
    const lastDate = dateOpt?.value;
    if (lastDate !== today) {
      counterOpt.value = "1";
      if (dateOpt) dateOpt.value = today;
      else dateOpt = repo.create({ key: BOOT_DATE_KEY, type: "string", value: today });
    } else {
      const count = parseInt(counterOpt.value || "0", 10);
      counterOpt.value = String(count + 1);
    }
  }

  if (!timeOpt) {
    timeOpt = repo.create({ key: BOOT_TIME_KEY, type: "string", value: currentTime });
  } else {
    timeOpt.value = currentTime;
  }

  await repo.save(counterOpt);
  if (dateOpt) await repo.save(dateOpt);
  if (timeOpt) await repo.save(timeOpt);

  console.info(`🔁 Boot count for ${today}: ${counterOpt.value}`);
  console.info(`🕒 Last boot time: ${currentTime}`);
};
