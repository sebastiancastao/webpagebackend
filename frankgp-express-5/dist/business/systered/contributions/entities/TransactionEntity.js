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
exports.TransactionEntity = void 0;
const typeorm_1 = require("typeorm");
const SavingsAccountEntity_1 = require("./SavingsAccountEntity");
let TransactionEntity = class TransactionEntity {
    id;
    account;
    type;
    amount;
    date;
    description;
};
exports.TransactionEntity = TransactionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SavingsAccountEntity_1.SavingsAccountEntity, account => account.transactions, { onDelete: 'CASCADE' }),
    __metadata("design:type", SavingsAccountEntity_1.SavingsAccountEntity)
], TransactionEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['DEPOSIT', 'WITHDRAW', 'INTEREST'] }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TransactionEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "description", void 0);
exports.TransactionEntity = TransactionEntity = __decorate([
    (0, typeorm_1.Entity)('savings_transactions')
], TransactionEntity);
//# sourceMappingURL=TransactionEntity.js.map