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
exports.UserLinkEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserLinkEntity = class UserLinkEntity {
    id;
    name;
    url;
    user;
};
exports.UserLinkEntity = UserLinkEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLinkEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserLinkEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserLinkEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.ProjectUserEntity, (user) => user.links),
    __metadata("design:type", user_entity_1.ProjectUserEntity)
], UserLinkEntity.prototype, "user", void 0);
exports.UserLinkEntity = UserLinkEntity = __decorate([
    (0, typeorm_1.Entity)('project_user_links')
], UserLinkEntity);
//# sourceMappingURL=user-link.entity.js.map