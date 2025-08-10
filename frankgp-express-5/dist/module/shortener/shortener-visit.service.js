"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerVisitService = void 0;
// src/module/shortener/shortener-visit.service.ts
const shortener_visit_model_1 = __importDefault(require("./models/shortener-visit.model"));
class ShortenerVisitService {
    async findAll() {
        return await shortener_visit_model_1.default.find().sort({ visitedAt: -1 }).populate("shortenerId");
    }
    async findByShortenerId(shortenerId) {
        return await shortener_visit_model_1.default.find({ shortenerId }).sort({ visitedAt: -1 });
    }
}
exports.ShortenerVisitService = ShortenerVisitService;
//# sourceMappingURL=shortener-visit.service.js.map