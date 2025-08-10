import { AppDataSource } from "../../../config/typeOrmConfig";
import { ContributionEntity } from "./entities/ContributionEntity";
import { Repository } from "typeorm";

export class ContributionsService {
  private repo: Repository<ContributionEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(ContributionEntity);
  }

  async findAll() {
    return await this.repo.find({
      relations: ["user", "period"]
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["user", "period"]
    });
  }

  async create(data: Partial<ContributionEntity>) {
    const contribution = this.repo.create(data);
    return await this.repo.save(contribution);
  }

  async update(id: number, data: Partial<ContributionEntity>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
