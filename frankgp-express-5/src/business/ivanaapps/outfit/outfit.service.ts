import { AppDataSource } from "../../../config/typeOrmConfig";
import { OutfitEntity } from "./entities/outfit.entity";

export class OutfitService {
  private readonly repo = AppDataSource.getRepository(OutfitEntity);

  async findAll() {
    return this.repo.find({
      relations: {
        tops: true,
        bottoms: true,
        accessories: true,
      },
      order: { date: "DESC" },
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        tops: true,
        bottoms: true,
        accessories: true,
      },
    });
  }

  async create(data: Partial<OutfitEntity> & { wardrobeId: number }) {
    const { tops, bottoms, accessories, wardrobeId, ...outfitData } = data;

    const outfit = this.repo.create(outfitData);

    if (wardrobeId) {
      outfit.wardrobe = { id: wardrobeId } as any; // ⚠️ TypeORM acepta referencia por ID si lo casteas
    }

    const savedOutfit = await this.repo.save(outfit);

    if (tops?.length) {
      await this.repo.createQueryBuilder().relation(OutfitEntity, "tops").of(savedOutfit).add(tops);
    }

    if (bottoms?.length) {
      await this.repo.createQueryBuilder().relation(OutfitEntity, "bottoms").of(savedOutfit).add(bottoms);
    }

    if (accessories?.length) {
      await this.repo.createQueryBuilder().relation(OutfitEntity, "accessories").of(savedOutfit).add(accessories);
    }

    return this.findOne(savedOutfit.id);
  }

  async update(id: number, data: Partial<OutfitEntity>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }
}
