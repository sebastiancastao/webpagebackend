import { Request, Response } from "express";
import { MenuItemService } from "./menu.service";

export class MenuItemController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const items = await MenuItemService.findAll();
    res.json(items);
  }

  static async getOne(req: Request, res: Response): Promise<void> {
    const item = await MenuItemService.findOne(Number(req.params.id));
    if (!item) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    res.json(item);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const newItem = await MenuItemService.create(req.body);
    res.status(201).json(newItem);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const updated = await MenuItemService.update(Number(req.params.id), req.body);
    if (!updated) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    res.json(updated);
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const deleted = await MenuItemService.delete(Number(req.params.id));
    res.json({ deleted });
  }
}
