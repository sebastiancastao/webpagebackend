"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserEntity = selectUserEntity;
const user_wardrobe_entity_1 = require("../../business/ivanaapps/wardrobe-user/entities/user-wardrobe.entity");
const UserEntity_1 = require("../../business/systered/contributions/entities/UserEntity");
const user_entity_1 = require("../entities/user.entity");
// export const getUserEntity = () => (USE_WARDROBE ? WardrobeUserEntity : UserEntity);
function selectUserEntity() {
    const entityType = process.env.USER_ENTITY;
    switch (entityType) {
        case "wardrobe":
            return user_wardrobe_entity_1.WardrobeUserEntity;
        case "contributions_users":
            return UserEntity_1.ContributionUserEntity;
        case "default":
        default:
            return user_entity_1.UserEntity;
    }
}
//# sourceMappingURL=selectUserEntity.js.map