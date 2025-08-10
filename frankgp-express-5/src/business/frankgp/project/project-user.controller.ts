import { AppError } from "../../../middleware/error.middleware";
import { ProjectUserService } from "./project-user.service";
import { Request, Response, NextFunction } from "express";

const service = new ProjectUserService();
export class ProjectUserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      // 
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

  async findUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username;
      const result = await service.findUsername(username);
      if (!result) throw new AppError("Project not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.create(req.body);
      res.status(201).json(result);
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
