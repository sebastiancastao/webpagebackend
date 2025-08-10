import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RestaurantTableEntity } from "./table.entity";
import { RestaurantCategoryEntity } from "../../restaurant-category/entities/category.entity";
import { RestaurantUserEntity } from "../../restaurant-user/entities/restaurant-user.entity";

@Entity('restaurant')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  location: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  whatsapp: string;

  @Column()
  instagram: string;

  @Column()
  googleMapUrl: string;

  @Column("simple-array", { nullable: true })
  photos: string[];

  @OneToMany(() => RestaurantCategoryEntity, (category) => category.restaurant, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  categories: RestaurantCategoryEntity[];

  @OneToMany(() => RestaurantUserEntity, (user) => user.restaurant, {
    cascade: true,
  })
  users: RestaurantUserEntity[];

  @OneToMany(() => RestaurantTableEntity, (table) => table.restaurant, {
    cascade: true,
    eager: true,
  })
  tables: RestaurantTableEntity[];
}
