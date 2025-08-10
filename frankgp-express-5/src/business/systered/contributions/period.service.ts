import { AppDataSource } from "../../../config/typeOrmConfig";
import { ContributionPeriodEntity } from "./entities/PeriodEntity";

export class PeriodService {
  private repo = AppDataSource.getRepository(ContributionPeriodEntity);

  async findAll() {
    return await this.repo.find({ relations: ["contributions", "payouts"] });
  }

  async findOne(id: number) {
    const period = await this.repo.findOne({ where: { id }, relations: ["contributions", "payouts"] });
    if (!period) throw new Error(`Period with id ${id} not found`);
    return period;
  }

  async create(data: Partial<ContributionPeriodEntity>) {
    const newPeriod = this.repo.create(data);
    return await this.repo.save(newPeriod);
  }

  async update(id: number, data: Partial<ContributionPeriodEntity>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const period = await this.findOne(id);
    await this.repo.remove(period);
  }
}
