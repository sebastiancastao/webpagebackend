"use strict";
// src/config/typeOrmConfig.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const _contributions_entities_1 = require("../business/systered/contributions/entities/_contributions.entities");
const options_entity_1 = require("../module/options/options.entity");
const shortener_entity_1 = require("../module/shortener/entities/shortener.entity");
const shortener_visit_entity_1 = require("../module/shortener/entities/shortener-visit.entity");
const stat_entity_1 = require("../module/stat/entities/stat.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const visit_entity_1 = require("../module/visit/visit.entity");
const _wardrobe_entities_1 = require("../business/ivanaapps/wardrobe/entities/_wardrobe.entities");
const whatsapp_message_entity_1 = require("../module/whatsapp/entities/whatsapp-message.entity");
const product_entity_1 = require("../business/frankgp/ecommerce/product/product.entity");
const _academy_entities_1 = require("../business/frankgp/academy/dtos-entities/_academy.entities");
const _proyect_entities_1 = require("../business/frankgp/project/entities/_proyect.entities");
const _restaurant_entities_1 = require("../business/systered/food/_restaurant.entities");
const entities = [
    // Tools
    user_entity_1.UserEntity,
    stat_entity_1.StatEntity,
    whatsapp_message_entity_1.WhatsappMessageEntity,
    visit_entity_1.VisitEntity,
    shortener_entity_1.ShortenerEntity,
    shortener_visit_entity_1.ShortenerVisitEntity,
    options_entity_1.OptionsEntity,
    // FrankGP
    product_entity_1.ProductEntity,
    ..._academy_entities_1.academy_entities,
    ..._proyect_entities_1.project_entities,
    // IvanaApps
    ..._wardrobe_entities_1.wardrobe_entities,
    // Systered
    ..._contributions_entities_1.contributions_entities,
    ..._restaurant_entities_1.restaurat_entities,
];
// Configuración de TypeORM
const typeOrmConfig = {
    type: envs_1.ENV_DB.DB_TYPE,
    host: envs_1.ENV_DB.DB_HOST,
    port: envs_1.ENV_DB.DB_PORT,
    username: envs_1.ENV_DB.DB_USERNAME,
    password: envs_1.ENV_DB.DB_PASSWORD,
    database: envs_1.ENV_DB.DB_DATABASE,
    synchronize: envs_1.ENV_DB.SYNCHRONIZE,
    dropSchema: envs_1.ENV_DB.DROPSCHEMA,
    logging: ["error"],
    entities: entities,
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: envs_1.ENV_DB.DB_SSL, // Configuración SSL opcional
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=typeOrmConfig.js.map