import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectUserEntity } from "./user.entity";

@Entity('project_user_links')
export class UserLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => ProjectUserEntity, (user) => user.links)
  user: ProjectUserEntity;
}
