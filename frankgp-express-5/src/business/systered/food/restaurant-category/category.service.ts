import { AppDataSource } from "../../../../config/typeOrmConfig";
import { RestaurantCategoryEntity } from "./entities/category.entity";

export class CategoryService {
  private static repo = AppDataSource.getRepository(RestaurantCategoryEntity);

  static async findAll() {
    return this.repo.find({ relations: ["menus"] });
  }

  static async findOne(id: number): Promise<RestaurantCategoryEntity | null> {
    return this.repo.findOne({ where: { id }, relations: ["menus"] });
  }

  static async create(data: Partial<RestaurantCategoryEntity>): Promise<RestaurantCategoryEntity> {
    const category = this.repo.create(data);
    return this.repo.save(category);
  }

  static async update(id: number, data: Partial<RestaurantCategoryEntity>): Promise<RestaurantCategoryEntity | null> {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) return null;

    this.repo.merge(category, data);
    return this.repo.save(category);
  }

  static async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
