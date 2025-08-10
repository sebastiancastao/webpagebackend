import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { SkillUserEntity } from "./user-skill.entity";
import { UserLinkEntity } from "./user-link.entity";

export enum UserLevel {
  // developer levels
  LEAD = "lead",
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior",
  EXPERT = "expert",

  // administration
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

@Entity("project_user")
export class ProjectUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  about: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ type: "enum", enum: UserLevel, default: UserLevel.JUNIOR })
  role: UserLevel;

  @ManyToMany(() => SkillUserEntity, { cascade: true, eager: true })
  @JoinTable()
  skills: SkillUserEntity[];

  @OneToMany(() => UserLinkEntity, (link) => link.user, { cascade: true, eager: true })
  links: UserLinkEntity[];
}
