import { Request, Response, NextFunction } from "express";
import { PeriodService } from "./period.service";

const service = new PeriodService();

export class PeriodController {
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
      const { id } = req.params;
      const data = await service.findOne(Number(id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await service.update(Number(id), req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await service.remove(Number(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
