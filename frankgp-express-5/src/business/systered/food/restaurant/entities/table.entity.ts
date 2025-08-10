import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";
import { RestaurantUserEntity } from "../../restaurant-user/entities/restaurant-user.entity";

@Entity('restaurant_table')
export class RestaurantTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.tables, {
    onDelete: "CASCADE",
  })
  restaurant: RestaurantEntity;

  @ManyToMany(() => RestaurantUserEntity, (user) => user.tables, {
    // cascade: true,
    eager: true,
  })
  @JoinTable()
  users: RestaurantUserEntity[];
}
