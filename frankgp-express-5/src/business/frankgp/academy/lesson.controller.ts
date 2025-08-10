import { Request, Response } from "express";
import { LessonService } from "./lesson.service";

export class LessonController {
  private service = new LessonService();

  async create(req: Request, res: Response) {
    const lesson = await this.service.create(req.body);
    res.json(lesson);
  }

  async findAll(_req: Request, res: Response) {
    const lessons = await this.service.findAll();
    res.json(lessons);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const lesson = await this.service.findOne(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  }

  async findSlug(req: Request, res: Response) {
    const slug = req.params.slug;
    const lesson = await this.service.findSlug(slug);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  }

  async findBySection(req: Request, res: Response) {
    const sectionId = parseInt(req.params.sectionId);
    const lessons = await this.service.findBySection(sectionId);
    res.json(lessons);
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
