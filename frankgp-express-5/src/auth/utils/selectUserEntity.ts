import { WardrobeUserEntity } from "../../business/ivanaapps/wardrobe-user/entities/user-wardrobe.entity";
import { ContributionUserEntity } from "../../business/systered/contributions/entities/UserEntity";
import { UserEntity } from "../entities/user.entity";

// export const getUserEntity = () => (USE_WARDROBE ? WardrobeUserEntity : UserEntity);

export function selectUserEntity() {
  const entityType = process.env.USER_ENTITY;

  switch (entityType) {
    case "wardrobe":
      return WardrobeUserEntity;
    case "contributions_users":
      return ContributionUserEntity;
    case "default":
    default:
      return UserEntity;
  }
}
