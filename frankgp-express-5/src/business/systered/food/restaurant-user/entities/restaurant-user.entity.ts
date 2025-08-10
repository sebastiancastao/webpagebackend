// src/module/restaurant/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { RestaurantEntity } from "../../restaurant/entities/restaurant.entity";
import { RestaurantTableEntity } from "../../restaurant/entities/table.entity";

export type UserRole = "waiter" | "cashier" | "supervisor" | "client";

@Entity("restaurant_user")
export class RestaurantUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column()
  name: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  photo: string;

  @Column({ select: true, nullable: true })
  password: string;

  @Column({ default: true })
  isVisible: boolean;

  @Column({
    type: "enum",
    enum: ["waiter", "cashier", "supervisor", "client"],
    default: "waiter",
  })
  role: UserRole;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.users)
  restaurant: RestaurantEntity;

  @ManyToMany(() => RestaurantTableEntity, (table) => table.users)
  tables: RestaurantTableEntity[];
}
