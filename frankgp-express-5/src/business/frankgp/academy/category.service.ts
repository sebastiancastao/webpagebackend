import { AppDataSource } from "../../../config/typeOrmConfig";
import { CategoryEntity } from "./dtos-entities/category.entity";

export class CategoryService {
  private repo = AppDataSource.getRepository(CategoryEntity);

  async create(data: { name: string }) {
    const existing = await this.repo.findOneBy({ name: data.name });

    if (existing) {
      return existing;
    }

    const category = this.repo.create(data);
    return await this.repo.save(category);
  }

  async findAll() {
    return await this.repo.find({ relations: ["courses"] });
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findSlug(slug: string) {
    return await this.repo.findOne({
      where: { slug },
      relations: ["courses"],
    });
  }

  async update(id: number, data: { name: string }) {
    const category = await this.repo.findOneBy({ id });
    if (!category) return null;

    this.repo.merge(category, data);
    return await this.repo.save(category);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: "Category deleted successfully" };
  }
}
