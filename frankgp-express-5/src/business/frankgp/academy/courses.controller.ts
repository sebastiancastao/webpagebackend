import { Request, Response } from "express";
import { CoursesService } from "./courses.service";

const service = new CoursesService();

export class CoursesController {
  async create(req: Request, res: Response) {
    const course = await service.create(req.body);
    res.json(course);
  }

  async findAll(req: Request, res: Response) {
    const courses = await service.findAll();
    res.json(courses);
  }

  async findOne(req: Request, res: Response) {
    const course = await service.findOne(+req.params.id);
    res.json(course);
  }

  async findSlug(req: Request, res: Response) {
    const course = await service.findSlug(req.params.slug);
    res.json(course);
  }

  async update(req: Request, res: Response) {
    const course = await service.update(+req.params.id, req.body);
    res.json(course);
  }

  async remove(req: Request, res: Response) {
    await service.remove(+req.params.id);
    res.json({ message: "Curso eliminado" });
  }
}
