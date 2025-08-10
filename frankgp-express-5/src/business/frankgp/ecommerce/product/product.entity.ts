import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("store_products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // Stock Keeping Unit (Unidad de Mantenimiento de Inventario).
  @Column({ length: 100 })
  sku!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ length: 255, nullable: true })
  shortDescription?: string; // Descripción corta para lista

  @Column("text", { nullable: true })
  longDescription?: string; // Texto o URL para descripción larga

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ length: 50, nullable: true })
  category?: string;

  @Column("simple-array", { nullable: true })
  tags?: string[];

  @Column("simple-array", { nullable: true })
  images?: string[]; // URLs de imágenes

  @Column("simple-array", { nullable: true })
  imagesMobile?: string[]; // URLs de imágenes

  @Column({ nullable: true })
  videoUrl?: string; // Link de video de YouTube

  @Column({ nullable: true })
  fileUrl?: string;

  @Column({ nullable: true })
  fileType?: string;

  @Column({ nullable: true })
  fileSize?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
