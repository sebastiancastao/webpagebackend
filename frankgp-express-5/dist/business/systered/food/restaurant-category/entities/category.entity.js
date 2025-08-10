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
exports.RestaurantCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("../../restaurant/entities/restaurant.entity");
const menu_entity_1 = require("../../restaurant-menu/entities/menu.entity");
let RestaurantCategoryEntity = class RestaurantCategoryEntity {
    id;
    name;
    slug;
    order;
    description;
    thumbnail;
    menus;
    restaurant;
};
exports.RestaurantCategoryEntity = RestaurantCategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantCategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantCategoryEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RestaurantCategoryEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], RestaurantCategoryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantCategoryEntity.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.RestaurantMenuEntity, (item) => item.category, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], RestaurantCategoryEntity.prototype, "menus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.RestaurantEntity, (restaurant) => restaurant.categories, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", restaurant_entity_1.RestaurantEntity)
], RestaurantCategoryEntity.prototype, "restaurant", void 0);
exports.RestaurantCategoryEntity = RestaurantCategoryEntity = __decorate([
    (0, typeorm_1.Entity)('restaurant_category')
], RestaurantCategoryEntity);
//# sourceMappingURL=category.entity.js.map