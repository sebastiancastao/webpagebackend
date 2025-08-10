"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsPlanEntity = void 0;
const typeorm_1 = require("typeorm");
const SavingsAccountEntity_1 = require("./SavingsAccountEntity");
let SavingsPlanEntity = class SavingsPlanEntity {
    id;
    name; // "Plan Escolar", "Plan Vivienda"
    interestRate; // Ej: 5.5%
    accounts;
};
exports.SavingsPlanEntity = SavingsPlanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SavingsPlanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SavingsPlanEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], SavingsPlanEntity.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SavingsAccountEntity_1.SavingsAccountEntity, account => account.plan),
    __metadata("design:type", Array)
], SavingsPlanEntity.prototype, "accounts", void 0);
exports.SavingsPlanEntity = SavingsPlanEntity = __decorate([
    (0, typeorm_1.Entity)('savings_plans')
], SavingsPlanEntity);
//# sourceMappingURL=SavingsPlanEntity.js.map