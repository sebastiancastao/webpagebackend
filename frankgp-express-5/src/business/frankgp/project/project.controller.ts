import { Request, Response, NextFunction } from "express";
import { ProjectService } from "./project.service";
import { AppError } from "../../../middleware/error.middleware";

const service = new ProjectService();

export class ProjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.create(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.findAll();
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await service.findOne(id);
      if (!result) throw new AppError("Project not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async findOneSlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;
      const result = await service.findOneBySlug(slug);
      if (!result) throw new AppError("Project not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }
  
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await service.update(id, req.body);
      if (!result) throw new AppError("Project not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await service.remove(id);
      if (!result) throw new AppError("Project not found", 404);
      res.json({ message: "Project deleted" });
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }
}
