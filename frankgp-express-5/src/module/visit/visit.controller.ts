// src/module/visit/visit.controller.ts
import { Request, Response, NextFunction } from "express";
import { VisitService } from "./visit.service";

const service = new VisitService();

export class VisitController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const visits = await service.findAll();
      res.json(visits);
    } catch (err) {
      next(err);
    }
  }

  async findAllMock(req: Request, res: Response, next: NextFunction) {
    try {
      const visits = await service.findAllMock();
      res.json(visits);
    } catch (err) {
      next(err);
    }
  }
}
