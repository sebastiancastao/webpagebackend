import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { WardrobeEntity } from "./wardrobe.entity";

@Entity("wardrobe_top")
export class WardrobeTopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  image: string;

  @Column()
  brand: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WardrobeEntity, (wardrobe) => wardrobe.tops)
  wardrobe: WardrobeEntity;
}
