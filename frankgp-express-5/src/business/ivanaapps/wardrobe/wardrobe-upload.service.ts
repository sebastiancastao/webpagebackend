import { AppDataSource } from "../../../config/typeOrmConfig";
import { WardrobeAccessoryEntity } from "./entities/accessory.entity";
import { WardrobeBottomEntity } from "./entities/bottom.entity";
import { WardrobeTopEntity } from "./entities/top.entity";
import { WardrobeEntity } from "./entities/wardrobe.entity";

type ItemType = "accessory" | "top" | "bottom";

interface UploadItemDTO {
  wardrobeId: number;
  type: ItemType;
  name: string;
  color: string;
  size: string;
  brand: string;
  image: string;
}

export class WardrobeUploadService {
  async saveItem(data: UploadItemDTO) {
    const wardrobe = await AppDataSource.getRepository(WardrobeEntity).findOneBy({
      id: data.wardrobeId,
    });

    if (!wardrobe) throw new Error("Wardrobe not found");

    const base = {
      name: data.name,
      color: data.color,
      size: data.size,
      image: data.image,
      brand: data.brand,
      wardrobe,
    };

    if (data.type === "accessory") {
      return await AppDataSource.getRepository(WardrobeAccessoryEntity).save(base);
    }

    if (data.type === "top") {
      return await AppDataSource.getRepository(WardrobeTopEntity).save(base);
    }

    if (data.type === "bottom") {
      return await AppDataSource.getRepository(WardrobeBottomEntity).save(base);
    }

    throw new Error("Invalid item type");
  }

  async getItemById(id: number, type: ItemType) {
    if (type === "accessory") {
      return await AppDataSource.getRepository(WardrobeAccessoryEntity).findOneBy({ id });
    }

    if (type === "top") {
      return await AppDataSource.getRepository(WardrobeTopEntity).findOneBy({ id });
    }

    if (type === "bottom") {
      return await AppDataSource.getRepository(WardrobeBottomEntity).findOneBy({ id });
    }

    throw new Error("Invalid item type");
  }
}
