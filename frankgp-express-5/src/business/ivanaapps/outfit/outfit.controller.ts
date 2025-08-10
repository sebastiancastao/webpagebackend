import { Request, Response } from "express";
import { OutfitService } from "./outfit.service";

export class OutfitController {
  private readonly service = new OutfitService();

  async findAll(req: Request, res: Response) {
    const data = await this.service.findAll();
    res.json(data);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = await this.service.findOne(id);
    res.json(data);
  }

  async create(req: Request, res: Response) {
    const data = await this.service.create(req.body);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updated = await this.service.update(id, req.body);
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await this.service.remove(id);
    res.json({ message: "Outfit eliminado correctamente" });
  }
}
