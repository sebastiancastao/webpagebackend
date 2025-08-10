import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Unique } from "typeorm";
import { RestaurantEntity } from "../../restaurant/entities/restaurant.entity";
import { RestaurantMenuEntity } from "../../restaurant-menu/entities/menu.entity";

@Entity('restaurant_category')
export class RestaurantCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  order: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @OneToMany(() => RestaurantMenuEntity, (item) => item.category, {
    cascade: true,
    eager: true,
  })
  menus: RestaurantMenuEntity[];

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.categories, {
    onDelete: "CASCADE",
  })
  restaurant: RestaurantEntity;
}
