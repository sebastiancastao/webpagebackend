import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("whatsapp_messages")
export class WhatsappMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // WHATSAPP_ID = contacts_wa_id || statuses_recipient_id
  @Column({ nullable: true })
  WHATSAPP_ID: string;

  // si entry_id existe, solo actualizamos
  @Column({ nullable: true })
  entry_id: string;

  // cuando se recibe el mensaje
  @Column({ nullable: true })
  contacts_wa_id: string;

  @Column({ nullable: true })
  contacts_name: string;

  @Column({ nullable: true })
  messages_from: string;

  @Column({ nullable: true })
  messages_id: string;

  @Column({ nullable: true })
  messages_timestamp: string;

  @Column({ nullable: true })
  messages_type: string;

  @Column({ type: "text", nullable: true })
  messages_body: string;

  // Para las reacciones a un mensaje
  @Column({ nullable: true })
  reaction_emoji: string;

  // cuando se envia el mensaje
  @Column({ nullable: true })
  statuses_id: string;

  @Column({ nullable: true })
  statuses_timestamp: string;

  @Column({ nullable: true })
  statuses_recipient_id: string;

  @Column({ nullable: true })
  expiration_timestamp: string;

  @Column({ nullable: true })
  pricing_billable: string;

  @Column({ nullable: true })
  pricing_category: string;

  @Column({ nullable: true }) // sent, delivered, read, failed, etc.
  statuses_status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
