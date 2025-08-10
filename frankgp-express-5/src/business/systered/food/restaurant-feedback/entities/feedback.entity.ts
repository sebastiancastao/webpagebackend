// src/module/feedback/entities/feedback.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('restaurant_feedback')
export class RestaurantFeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchVisited: string;

  @Column()
  clientCode: string;

  @Column({ default: false })
  awarded: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column({ type: "date" })
  birthday: string;

  @Column({ nullable: true })
  waiterName: string;

  @Column()
  howDidYouKnowUs: string; // corresponde a howMet en frontend

  @Column({ nullable: true })
  socialMediaSource: string;

  @Column({ type: "int" })
  experienceRating: number;

  @Column({ type: "text", nullable: true })
  improvementSuggestions: string;

  @Column({ default: false })
  acceptTerms: boolean;

  @Column({ type: "datetime" })
  createdAt: Date;
}
