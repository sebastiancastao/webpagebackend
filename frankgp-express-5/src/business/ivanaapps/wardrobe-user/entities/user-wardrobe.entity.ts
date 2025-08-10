// wardrobe-user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { WardrobeEntity } from "../../wardrobe/entities/wardrobe.entity";

@Entity("wardrobe_user")
export class WardrobeUserEntity {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ select: true, nullable: true })
  password: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WardrobeEntity, (wardrobe) => wardrobe.user, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  wardrobes: WardrobeEntity[];
}
