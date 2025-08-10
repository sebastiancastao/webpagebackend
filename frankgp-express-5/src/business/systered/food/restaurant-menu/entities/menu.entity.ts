import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RestaurantCategoryEntity } from "../../restaurant-category/entities/category.entity";

@Entity('restaurant_menu')
export class RestaurantMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  offerPrice?: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column("simple-array", { nullable: true })
  images?: string[];

  @Column("simple-array", { nullable: true })
  videos?: string[];

  @Column({ default: false })
  isDailySpecial: boolean;

  @ManyToOne(() => RestaurantCategoryEntity, (category) => category.menus, {
    // eager: true,
    // cascade: true,
    // onDelete: "CASCADE",
    //
  })
  category: RestaurantCategoryEntity;
}
