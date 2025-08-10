import { AppDataSource } from "../../../../config/typeOrmConfig";
import { RestaurantMenuEntity } from "./entities/menu.entity";

export class MenuItemService {
  private static repo = AppDataSource.getRepository(RestaurantMenuEntity);

  static async findAll(): Promise<RestaurantMenuEntity[]> {
    return this.repo.find();
  }

  static async findOne(id: number): Promise<RestaurantMenuEntity | null> {
    return this.repo.findOneBy({ id });
  }

  static async create(body: Partial<RestaurantMenuEntity>): Promise<RestaurantMenuEntity> {
    const defaultImage = "https://i.postimg.cc/nz2mV6Fv/demo.webp";

    const data: Partial<RestaurantMenuEntity> = {
      ...body,
      images: body.images?.length ? body.images : [defaultImage],
    };

    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  static async update(id: number, data: Partial<RestaurantMenuEntity>): Promise<RestaurantMenuEntity | null> {
    const item = await this.repo.findOneBy({ id });
    if (!item) return null;
    this.repo.merge(item, data);
    return this.repo.save(item);
  }

  static async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected === 1;
  }
}
