import { Request, Response } from "express";
import { SectionService } from "./section.service";

export class SectionController {
  private service = new SectionService();

  async create(req: Request, res: Response) {
    const section = await this.service.create(req.body);
    res.status(201).json(section);
  }

  async findAll(_req: Request, res: Response) {
    const sections = await this.service.findAll();
    res.json(sections);
  }

  async findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const section = await this.service.findOne(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.json(section);
  }

  async findByCourse(req: Request, res: Response) {
    const courseId = Number(req.params.courseId);
    const sections = await this.service.findByCourse(courseId);
    res.json(sections);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedSection = await this.service.update(id, req.body);
    res.json(updatedSection);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.service.remove(id);
    res.json(result);
  }
}
