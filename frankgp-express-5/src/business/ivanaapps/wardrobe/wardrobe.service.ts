import { AppDataSource } from "../../../config/typeOrmConfig";
import { toSlug } from "../../../utils/slugify";
import { WardrobeEntity } from "./entities/wardrobe.entity";

export class WardrobeService {
  private wardrobeRepo = AppDataSource.getRepository(WardrobeEntity);

  async findAll() {
    return await this.wardrobeRepo.find({
      relations: [
        "user",
        "tops",
        "bottoms",
        "accessories",
        "outfits",
        "outfits.tops",
        "outfits.bottoms",
        "outfits.accessories",
      ],
    });
  }

  async findOne(id: number) {
    return await this.wardrobeRepo.findOne({
      where: { id },
      relations: [
        "user",
        "tops",
        "bottoms",
        "accessories",
        "outfits",
        "outfits.tops",
        "outfits.bottoms",
        "outfits.accessories",
      ],
    });
  }

  async create(data: Partial<WardrobeEntity>) {
    if (data.name) {
      data.slug = toSlug(data.name);
    }
    const newWardrobe = this.wardrobeRepo.create(data);
    return await this.wardrobeRepo.save(newWardrobe);
  }

  async update(id: number, data: Partial<WardrobeEntity>) {
    await this.wardrobeRepo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.wardrobeRepo.delete(id);
  }
}
