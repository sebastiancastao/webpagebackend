"use strict";
// src/module/shortener/shortener-visit.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerVisitService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const shortener_visit_entity_1 = require("./entities/shortener-visit.entity");
class ShortenerVisitService {
    visitRepo = typeOrmConfig_1.AppDataSource.getRepository(shortener_visit_entity_1.ShortenerVisitEntity);
    async findAll() {
        return this.visitRepo.find({
            order: { visitedAt: "DESC" },
            relations: ["shortener"],
        });
    }
    async findByShortenerId(shortenerId) {
        return this.visitRepo.find({
            where: { shortenerId },
            order: { visitedAt: "DESC" },
        });
    }
}
exports.ShortenerVisitService = ShortenerVisitService;
//# sourceMappingURL=shortener-visit.sql.service.js.map