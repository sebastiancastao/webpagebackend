// src/module/restaurant/restaurant.service.ts
import { AppDataSource } from "../../../../config/typeOrmConfig";
import { RestaurantUserEntity } from "../restaurant-user/entities/restaurant-user.entity";
import { RestaurantEntity } from "./entities/restaurant.entity";

export class RestaurantService {
  static locationRepo = AppDataSource.getRepository(RestaurantEntity);
  static userRepo = AppDataSource.getRepository(RestaurantUserEntity);

  static async findAllLocations() {
    return await this.locationRepo.find({ relations: ["users"] });
  }

  static async findLocationById(id: number) {
    return await this.locationRepo.findOne({ where: { id }, relations: ["users"] });
  }

  static async createLocation(data: Partial<RestaurantEntity>) {
    const created = this.locationRepo.create(data);
    return await this.locationRepo.save(created);
  }

  static async updateLocation(id: number, data: Partial<RestaurantEntity>) {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) return null;
    this.locationRepo.merge(location, data);
    return await this.locationRepo.save(location);
  }

  static async deleteLocation(id: number) {
    const result = await this.locationRepo.delete(id);
    return result.affected === 1;
  }

  static async findLocationBySlug(slug: string) {
    return await this.locationRepo.findOne({
      where: { slug },
      relations: ["users", "categories", "tables"],
    });
  }

  static async findWaitersByRestaurantSlug(slug: string) {
    const restaurant = await this.locationRepo.findOne({
      where: { slug },
      relations: ["users"],
    });

    if (!restaurant) return null;

    return restaurant.users.filter((user) => user.role === "waiter");
  }

  static async findTablesByRestaurantSlug(slug: string) {
    const restaurant = await this.locationRepo.findOne({
      where: { slug },
      relations: ["tables"],
    });

    if (!restaurant) return null;

    return restaurant.tables;
  }

  static async findCategoriesBySlugWithMenuName(slug: string, menuName?: string) {
    const restaurant = await this.locationRepo.findOne({
      where: { slug },
      relations: ["categories", "categories.menus"],
    });

    if (!restaurant) return null;

    if (!menuName) {
      // 🔽 Ordenar categorías directamente si no hay filtro de menú
      return restaurant.categories.sort((a, b) => a.order - b.order);
    }

    const filteredCategories = restaurant.categories
      .map((category) => {
        const filteredMenus = category.menus.filter(
          (menu) =>
            menu.name.toLowerCase().includes(menuName.trim().toLowerCase()) ||
            menu.slug.toLowerCase().includes(menuName.trim().toLowerCase())
        );
        return filteredMenus.length > 0 ? { ...category, menus: filteredMenus } : null;
      })
      .filter((category) => category !== null)
      .sort((a, b) => a.order - b.order); // 🔽 Ordenar también los resultados filtrados

    return filteredCategories;
  }
}
