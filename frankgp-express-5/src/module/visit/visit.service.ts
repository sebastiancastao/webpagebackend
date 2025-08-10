// src/module/visit/visit.service.ts
import { AppDataSource } from "../../config/typeOrmConfig";
import { visitDataMock } from "../../middleware/visit.middleware";
import { VisitEntity } from "./visit.entity";
import { Repository } from "typeorm";

export class VisitService {
  private repo: Repository<VisitEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(VisitEntity);
  }

  async findAll(): Promise<VisitEntity[]> {
    return this.repo.find({
      order: { visitedAt: "DESC" }, // opcional: ordenar por fecha
    });
  }

  async findAllMock(): Promise<VisitEntity[]> {
    // Retornar ordenado por fecha descendente
    return visitDataMock.sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());
  }
}
