import { Request, Response, NextFunction } from "express";
import { ContributionsService } from "./contributions.service";

const service = new ContributionsService();

export class ContributionsController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.findOne(Number(req.params.id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await service.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await service.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
