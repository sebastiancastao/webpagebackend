import { Request, Response, NextFunction } from "express";
import { WhatsappService } from "./whatsapp.service";
import { AppError } from "../../middleware/error.middleware";

export class WhatsappController {
  private service = new WhatsappService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await this.service.getAllMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) throw new AppError("Invalid ID", 400);

      const message = await this.service.getMessageById(id);
      if (!message) throw new AppError("Message not found", 404);

      res.json(message);
    } catch (error) {
      next(error);
    }
  }

async getMessageByWHATSAPP_ID(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    if (!id) throw new AppError("Invalid ID", 400);  // Se valida si el ID es inválido

    const message = await this.service.getMessageByWHATSAPP_ID(id);
    if (!message) throw new AppError("Message not found", 404);

    res.json(message);
  } catch (error) {
    next(error);
  }
}


  async getByEntryId(req: Request, res: Response, next: NextFunction) {
    try {
      const entryId = req.params.entry_id;
      if (!entryId) throw new AppError("entry_id is required", 400);

      const messages = await this.service.getMessagesByEntryId(entryId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}
