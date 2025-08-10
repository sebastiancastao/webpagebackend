import { Request, Response } from "express";
import { WardrobeService } from "./wardrobe.service";

export class WardrobeController {
  private service = new WardrobeService();

  async findAll(req: Request, res: Response) {
    const wardrobes = await this.service.findAll();
    res.json(wardrobes);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const wardrobe = await this.service.findOne(+id);
    res.json(wardrobe);
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const wardrobe = await this.service.create(data);
    res.status(201).json(wardrobe);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const updated = await this.service.update(+id, data);
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.remove(+id);
    res.status(204).send();
  }
}
