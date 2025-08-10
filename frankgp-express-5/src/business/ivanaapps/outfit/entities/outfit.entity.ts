import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { WardrobeEntity } from "../../wardrobe/entities/wardrobe.entity";
import { WardrobeTopEntity } from "../../wardrobe/entities/top.entity";
import { WardrobeBottomEntity } from "../../wardrobe/entities/bottom.entity";
import { WardrobeAccessoryEntity } from "../../wardrobe/entities/accessory.entity";

@Entity("outfits")
export class OutfitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "date" })
  date: string; // YYYY-MM-DD para identificar el día

  @Column({ nullable: true })
  type: string; // ejemplo: "trabajo", "fiesta", "paseo", etc.

  @ManyToOne(() => WardrobeEntity, (wardrobe) => wardrobe.outfits, { onDelete: "CASCADE" })
  wardrobe: WardrobeEntity;

  @ManyToMany(() => WardrobeTopEntity)
  @JoinTable()
  tops: WardrobeTopEntity[];

  @ManyToMany(() => WardrobeBottomEntity)
  @JoinTable()
  bottoms: WardrobeBottomEntity[];

  @ManyToMany(() => WardrobeAccessoryEntity)
  @JoinTable()
  accessories: WardrobeAccessoryEntity[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
