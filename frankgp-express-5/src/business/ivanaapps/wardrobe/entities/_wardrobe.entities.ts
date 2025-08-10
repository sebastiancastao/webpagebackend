// IvanaApps - Wardrobe
import { WardrobeAccessoryEntity } from "./accessory.entity";
import { WardrobeBottomEntity } from "./bottom.entity";
import { WardrobeEntity } from "./wardrobe.entity";
import { WardrobeTopEntity } from "./top.entity";
import { WardrobeUserEntity } from "../../wardrobe-user/entities/user-wardrobe.entity";
import { OutfitEntity } from "../../outfit/entities/outfit.entity";

export const wardrobe_entities = [
  WardrobeAccessoryEntity,
  WardrobeBottomEntity,
  WardrobeEntity,
  WardrobeTopEntity,
  WardrobeUserEntity,
  OutfitEntity,
];
