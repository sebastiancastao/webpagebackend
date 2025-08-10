import { Request, Response } from "express";
import { WardrobeUploadService } from "./wardrobe-upload.service";

export class WardrobeUploadController {
  private service = new WardrobeUploadService();

  async uploadItem(req: Request, res: Response) {
    const { wardrobeId, type } = req.body;
    const image = req.file?.filename;

    if (!wardrobeId || !type || !image) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await this.service.saveItem({
      wardrobeId: parseInt(wardrobeId),
      type,
      name: req.body.name,
      color: req.body.color,
      size: req.body.size,
      brand: req.body.brand,
      image,
    });

    return res.status(201).json(result);
  }

  async getItem(req: Request, res: Response) {
    const id = parseInt(req.query.id as string, 10);
    const type = req.query.type as "accessory" | "top" | "bottom";

    if (isNaN(id) || !type) {
      return res.status(400).json({ message: "Invalid id or type" });
    }

    const item = await this.service.getItemById(id, type);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  }
}
