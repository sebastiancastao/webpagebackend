import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRoleEnum } from "../enum/roles.enum";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ select: true, nullable: true })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({
    type: "enum",
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  googleId: string;

  @Column({ length: 100, nullable: true })
  displayName: string;

  @Column({ type: "text", nullable: true })
  rawGoogle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
