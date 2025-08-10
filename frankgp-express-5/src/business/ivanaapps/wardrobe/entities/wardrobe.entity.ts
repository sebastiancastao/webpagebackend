// wardrobe.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { WardrobeTopEntity } from "./top.entity";
import { WardrobeBottomEntity } from "./bottom.entity";
import { WardrobeAccessoryEntity } from "./accessory.entity";
import { OutfitEntity } from "../../outfit/entities/outfit.entity";
import { WardrobeUserEntity } from "../../wardrobe-user/entities/user-wardrobe.entity";

@Entity("wardrobe")
export class WardrobeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => WardrobeUserEntity, (user) => user.wardrobes, { onDelete: "CASCADE" })
  user: WardrobeUserEntity;

  @OneToMany(() => WardrobeTopEntity, (top) => top.wardrobe, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  tops: WardrobeTopEntity[];

  @OneToMany(() => WardrobeBottomEntity, (bottom) => bottom.wardrobe, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  bottoms: WardrobeBottomEntity[];

  @OneToMany(() => WardrobeAccessoryEntity, (accessory) => accessory.wardrobe, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  accessories: WardrobeAccessoryEntity[];

  @OneToMany(() => OutfitEntity, (outfit) => outfit.wardrobe, {
    cascade: true,
    eager: true,
  })
  outfits: OutfitEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
