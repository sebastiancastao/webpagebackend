import { Request, Response, NextFunction } from "express";
import { EmailService } from "./email.service";
import { AppError } from "../../../../middleware/error.middleware";

const service = new EmailService();

export class EmailController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      await service.sendContactEmail(req.body);
      res.json({ success: true, message: "¡Formulario enviado con éxito!" });
    } catch (error: any) {
      console.error("Error al enviar correo:", error);
      next(new AppError("Error al enviar el formulario", 500));
    }
  }
}
