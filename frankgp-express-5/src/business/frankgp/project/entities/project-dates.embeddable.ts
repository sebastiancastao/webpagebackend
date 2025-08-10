import { Column, Entity } from "typeorm";

export class ProjectDates {
  @Column({ type: "date" })
  start: string;

  @Column({ type: "date" })
  end: string;

  @Column()
  duration: string;
}
