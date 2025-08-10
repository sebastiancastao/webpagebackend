import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  private service = new CategoryService();

  async create(req: Request, res: Response) {
    const category = await this.service.create(req.body);
    res.json(category);
  }

  async findAll(_req: Request, res: Response) {
    const categories = await this.service.findAll();
    res.json(categories);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const category = await this.service.findOne(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  }

  async findSlug(req: Request, res: Response) {
    const slug = req.params.slug;
    const category = await this.service.findSlug(slug);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updated = await this.service.update(id, req.body);
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.service.remove(id);
    res.json(result);
  }
}
