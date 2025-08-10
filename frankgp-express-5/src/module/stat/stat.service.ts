// src/module/stat/stat.service.ts

import { AppDataSource } from "../../config/typeOrmConfig";
import { StatEntity } from "./entities/stat.entity";

export class StatService {
  private repo = AppDataSource.getRepository(StatEntity);

  truncate = (str: string | undefined, max: number) => (str && str.length > max ? str.substring(0, max) : str);

  async track(data: Partial<StatEntity>) {
    data.currentURL = this.truncate(data.currentURL, 200);
    data.referrerURL = this.truncate(data.referrerURL, 200);
    const stat = this.repo.create(data);
    return await this.repo.save(stat);
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: "DESC" } });
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
