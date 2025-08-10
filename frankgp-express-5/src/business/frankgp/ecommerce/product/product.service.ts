import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";
import { AppDataSource } from "../../../../config/typeOrmConfig";

export class ProductService {
  private repo: Repository<ProductEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(ProductEntity);
  }

  async findAll() {
    const results = await this.repo.find();
    return {
      page: 1,
      totalPages: 1,
      totalItems: 1,
      hasMore: false,
      results,
    };
  }

  async findOne(id: number): Promise<ProductEntity | null> {
    return this.repo.findOneBy({ id });
  }

  async findSlug(slug: string): Promise<ProductEntity | null> {
    return this.repo.findOneBy({ slug });
  }

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<ProductEntity>): Promise<ProductEntity | null> {
    const product = await this.repo.findOneBy({ id });
    if (!product) return null;
    this.repo.merge(product, data);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
