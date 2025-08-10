import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
  private service = new ProductService();

  findAll = async (req: Request, res: Response) => {
    const products = await this.service.findAll();
    res.json(products);
  };

  findOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await this.service.findOne(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  };

  findSlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const product = await this.service.findSlug(slug);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  };

  create = async (req: Request, res: Response) => {
    const product = await this.service.create(req.body);
    res.status(201).json(product);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await this.service.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  };

  remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await this.service.remove(id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(204).send();
  };
}
