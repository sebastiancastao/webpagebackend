import { Request, Response } from "express";
import { OptionsService } from "./options.service";

export class OptionsController {
  private service = new OptionsService();

  async create(req: Request, res: Response) {
    const option = await this.service.create(req.body);
    res.json(option);
  }

  async findAll(_req: Request, res: Response) {
    const options = await this.service.findAll();
    res.json(options);
  }

  async findOne(req: Request, res: Response) {
    const option = await this.service.findOne(Number(req.params.id));
    res.json(option);
  }

  async findByKey(req: Request, res: Response) {
    const option = await this.service.findByKey(req.params.key);
    res.json(option);
  }

  async update(req: Request, res: Response) {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    await this.service.remove(Number(req.params.id));
    res.json({ message: "Deleted successfully" });
  }

  async getBootCount(req: Request, res: Response) {
    const bootCount = await this.service.getBootCount();
    res.json({
      "Server Time": new Date().toLocaleString(),
      "Boot Count": bootCount,
    });
  }
}
