import { Request, Response, NextFunction } from "express";
import { AppError } from "../../middleware/error.middleware";
import { SenderService } from "./whatsapp-sender.service";

export class SenderController {
    private senderService = new SenderService();

    async sendMessage(req: Request, res: Response, next: NextFunction) {
      try {
        const { to, message } = req.body;
    
        if (!to || !message) {
          throw new AppError("Missing 'to' or 'message' in request body", 400);
        }
    
        const result = await this.senderService.sendTextMessage(to, message);
        res.json(result);
      } catch (error) {
        next(error);
      }
    }

  
}
