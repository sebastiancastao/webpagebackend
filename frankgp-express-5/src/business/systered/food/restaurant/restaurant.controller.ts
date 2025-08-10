// src/module/restaurant/restaurant.controller.ts
import { Request, Response } from "express";
import { RestaurantService } from "./restaurant.service";

export class RestaurantController {
  static async findAll(req: Request, res: Response): Promise<void> {
    const locations = await RestaurantService.findAllLocations();
    res.json(locations);
  }

  static async findOne(req: Request, res: Response): Promise<void> {
    const location = await RestaurantService.findLocationById(Number(req.params.id));
    if (!location) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(location);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const result = await RestaurantService.createLocation(req.body);
    res.status(201).json(result);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const updated = await RestaurantService.updateLocation(Number(req.params.id), req.body);
    if (!updated) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(updated);
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const success = await RestaurantService.deleteLocation(Number(req.params.id));
    res.json({ deleted: success });
  }

  static async getBySlug(req: Request, res: Response): Promise<void> {
    const location = await RestaurantService.findLocationBySlug(req.params.slug);
    if (!location) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(location);
  }

  static async getWaitersBySlug(req: Request, res: Response): Promise<void> {
    const slug = req.params.slug;
    const waiters = await RestaurantService.findWaitersByRestaurantSlug(slug);

    if (!waiters) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.json(waiters);
  }

  static async getTablesBySlug(req: Request, res: Response): Promise<void> {
    const slug = req.params.slug;
    const tables = await RestaurantService.findTablesByRestaurantSlug(slug);

    if (!tables) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.json(tables);
  }

  static async getCategoriesBySlug(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;
    const { menuName } = req.query;

    const categories = await RestaurantService.findCategoriesBySlugWithMenuName(
      slug,
      typeof menuName === "string" ? menuName : undefined
    );

    if (!categories) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.json(categories);
  }
}
