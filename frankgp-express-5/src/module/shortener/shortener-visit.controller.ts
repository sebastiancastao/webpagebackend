// src/module/shortener/shortener-visit.controller.ts

import { Request, Response, NextFunction } from "express";
import { ShortenerVisitService } from "./shortener-visit.service";
import { AppError } from "../../middleware/error.middleware";

const service = new ShortenerVisitService();

export class ShortenerVisitController {
  async findByShortenerId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const visits = await service.findByShortenerId(id);
      res.json(visits);
    } catch (err: any) {
      next(new AppError(err.message || "Error fetching visits", 400));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const visits = await service.findAll();
      res.json(visits);
    } catch (err: any) {
      next(new AppError(err.message || "Error fetching all visits", 400));
    }
  }
}
