import { AppDataSource } from "../../../config/typeOrmConfig";
import { ContributionPayoutEntity } from "./entities/PayoutEntity";

export class PayoutService {
  private repo = AppDataSource.getRepository(ContributionPayoutEntity);

  async findAll() {
    return await this.repo.find({ relations: ["user", "period"] });
  }

  async findOne(id: number) {
    const payout = await this.repo.findOne({
      where: { id },
      relations: ["user", "period"]
    });
    if (!payout) throw new Error(`Payout with id ${id} not found`);
    return payout;
  }

  async create(data: Partial<ContributionPayoutEntity>) {
    const newPayout = this.repo.create(data);
    return await this.repo.save(newPayout);
  }

  async update(id: number, data: Partial<ContributionPayoutEntity>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const payout = await this.findOne(id);
    await this.repo.remove(payout);
  }
}
