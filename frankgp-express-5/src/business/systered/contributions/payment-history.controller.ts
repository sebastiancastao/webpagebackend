import { Request, Response, NextFunction } from "express";
import { PaymentHistoryService } from "./payment-history.service";

const service = new PaymentHistoryService();

export class PaymentHistoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await service.findAll();
      res.json(results);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.findOne(parseInt(req.params.id, 10));
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.update(parseInt(req.params.id, 10), req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await service.remove(parseInt(req.params.id, 10));
      res.json({ success });
    } catch (err) {
      next(err);
    }
  }
}
