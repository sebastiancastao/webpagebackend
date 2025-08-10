import { AppDataSource } from "../../config/typeOrmConfig";
import { OptionsEntity } from "./options.entity";

export class OptionsService {
  private repo = AppDataSource.getRepository(OptionsEntity);

  create(data: Partial<OptionsEntity>) {
    const option = this.repo.create(data);
    return this.repo.save(option);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByKey(key: string) {
    return this.repo.findOneBy({ key });
  }

  async update(id: number, data: Partial<OptionsEntity>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const option = await this.findOne(id);
    return this.repo.remove(option);
  }

  async getBootCount() {
    // const repo = AppDataSource.getRepository(OptionsEntity);
    const opt = await this.repo.findOneBy({ key: "boot_counter" });
    return opt ? parseInt(opt.value, 10) : 0;
  }
}
