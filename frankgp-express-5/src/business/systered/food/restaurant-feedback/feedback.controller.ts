// src\feedback\feedback.controller.ts

import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";

export class FeedbackController {
  static async create(req: Request, res: Response): Promise<void> {
    const result = await FeedbackService.create(req.body);
    res.status(201).json(result);
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    const feedbacks = await FeedbackService.findAll();
    res.json(feedbacks);
  }

  static async getOne(req: Request, res: Response): Promise<void> {
    const feedback = await FeedbackService.findOne(Number(req.params.id));
    if (!feedback) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(feedback);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const updated = await FeedbackService.update(Number(req.params.id), req.body);
    if (!updated) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.json(updated);
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const success = await FeedbackService.remove(Number(req.params.id));
    res.json({ deleted: success });
  }
}
