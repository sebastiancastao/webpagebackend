// src/module/shortener/shortener-visit.service.ts

import { AppDataSource } from "../../config/typeOrmConfig";
import { ShortenerVisitEntity } from "./entities/shortener-visit.entity";

export class ShortenerVisitService {
  private visitRepo = AppDataSource.getRepository(ShortenerVisitEntity);

  async findAll() {
    return this.visitRepo.find({
      order: { visitedAt: "DESC" },
      relations: ["shortener"],
    });
  }

  async findByShortenerId(shortenerId: number) {
    return this.visitRepo.find({
      where: { shortenerId },
      order: { visitedAt: "DESC" },
    });
  }
}
