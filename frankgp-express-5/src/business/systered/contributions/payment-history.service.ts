import { AppDataSource } from "../../../config/typeOrmConfig";
import { Repository } from "typeorm";
import { ContributionPaymentHistoryEntity } from "./entities/PaymentHistoryEntity";

export class PaymentHistoryService {
  private repo: Repository<ContributionPaymentHistoryEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(ContributionPaymentHistoryEntity);
  }

  async findAll() {
    return await this.repo.find({
      relations: ["user", "contribution"],
      order: { createdAt: "DESC" }
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["user", "contribution"]
    });
  }

  async create(data: Partial<ContributionPaymentHistoryEntity>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async update(id: number, data: Partial<ContributionPaymentHistoryEntity>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
