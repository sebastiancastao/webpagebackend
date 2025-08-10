import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  static async findAll(req: Request, res: Response): Promise<void> {
    const categories = await CategoryService.findAll();
    res.json(categories);
  }

  static async findOne(req: Request, res: Response): Promise<void> {
    const category = await CategoryService.findOne(Number(req.params.id));
    if (!category) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(category);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const result = await CategoryService.create(req.body);
    res.status(201).json(result);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const result = await CategoryService.update(Number(req.params.id), req.body);
    if (!result) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(result);
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const success = await CategoryService.delete(Number(req.params.id));
    res.json({ deleted: success });
  }
}
