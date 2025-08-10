// src/config/typeOrmConfig.ts

import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import { ENV_DB } from "./envs";

import { contributions_entities } from "../business/systered/contributions/entities/_contributions.entities";
import { OptionsEntity } from "../module/options/options.entity";
import { ShortenerEntity } from "../module/shortener/entities/shortener.entity";
import { ShortenerVisitEntity } from "../module/shortener/entities/shortener-visit.entity";
import { StatEntity } from "../module/stat/entities/stat.entity";
import { UserEntity } from "../auth/entities/user.entity";
import { VisitEntity } from "../module/visit/visit.entity";
import { wardrobe_entities } from "../business/ivanaapps/wardrobe/entities/_wardrobe.entities";
import { WhatsappMessageEntity } from "../module/whatsapp/entities/whatsapp-message.entity";
import { ProductEntity } from "../business/frankgp/ecommerce/product/product.entity";
import { academy_entities } from "../business/frankgp/academy/dtos-entities/_academy.entities";
import { project_entities } from "../business/frankgp/project/entities/_proyect.entities";
import { restaurat_entities } from "../business/systered/food/_restaurant.entities";

const entities = [
  // Tools
  UserEntity,
  StatEntity,
  WhatsappMessageEntity,
  VisitEntity,
  ShortenerEntity,
  ShortenerVisitEntity,
  OptionsEntity,

  // FrankGP
  ProductEntity,
  ...academy_entities,
  ...project_entities,

  // IvanaApps
  ...wardrobe_entities,

  // Systered
  ...contributions_entities,
  ...restaurat_entities,
];

// Configuración de TypeORM
const typeOrmConfig: DataSourceOptions = {
  type: ENV_DB.DB_TYPE as "mysql" | "postgres",
  host: ENV_DB.DB_HOST,
  port: ENV_DB.DB_PORT,
  username: ENV_DB.DB_USERNAME,
  password: ENV_DB.DB_PASSWORD,
  database: ENV_DB.DB_DATABASE,
  synchronize: ENV_DB.SYNCHRONIZE,
  dropSchema: ENV_DB.DROPSCHEMA,
  logging: ["error"],
  entities: entities,
  migrations: ["dist/migrations/*{.ts,.js}"],
  subscribers: [],
  ssl: ENV_DB.DB_SSL, // Configuración SSL opcional
};

// Crear la instancia de DataSource
export const AppDataSource = new DataSource(typeOrmConfig);

// Exporta el tipo para uso global en otras partes de la app
export const conectionSource = new DataSource(typeOrmConfig as DataSourceOptions);
