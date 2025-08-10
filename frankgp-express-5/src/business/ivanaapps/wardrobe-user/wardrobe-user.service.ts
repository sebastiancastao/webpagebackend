import { AppDataSource } from "../../../config/typeOrmConfig";
import { WardrobeUserEntity } from "./entities/user-wardrobe.entity";

export class WardrobeUserService {
  private repo = AppDataSource.getRepository(WardrobeUserEntity);

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { _id: id } });
  }

  create(data: Partial<WardrobeUserEntity>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: string, data: Partial<WardrobeUserEntity>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }

  async findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }
}
