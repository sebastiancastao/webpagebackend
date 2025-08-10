// src/module/stat/stat.analytics.controller.ts

import { Request, Response, NextFunction } from "express";
import { StatAnalyticsService } from "./stat.analytics.service";
import { AppError } from "../../middleware/error.middleware";

const service = new StatAnalyticsService();

export class StatAnalyticsController {
  async summary(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getSummary();
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message || "Internal Error", 500));
    }
  }

  async byDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { from, to } = req.query;
      const result = await service.getByDate(from as string, to as string);
      res.json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async byCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getByCountry();
      res.json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async byURL(req: Request, res: Response, next: NextFunction) {
    try {
      const { dateFrom, dateTo } = req.query;

      const result = await service.getByURL({
        dateFrom: dateFrom as string,
        dateTo: dateTo as string,
      });

      res.json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async byAffiliate(req: Request, res: Response, next: NextFunction) {
    try {
      const { source } = req.query;
      const result = await service.getByAffiliate(source as string);
      res.json(result);
    } catch (err: any) {
      next(err);
    }
  }
}
