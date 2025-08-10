// src/module/database/db-backup.controller.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../middleware/error.middleware";
import { MongooseService } from "./mongoose.service";

export class MongooseController {
  private dbBackupService = new MongooseService();

  public backup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.dbBackupService.backup();
      res.json({ message: result });
    } catch (error: any) {
      next(new AppError(`Error al generar el backup: ${error.message}`, 500));
    }
  };

  public dropCollections = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.dbBackupService.dropAllCollections();
      res.json({ message: "Todas las colecciones eliminadas", dropped: result });
    } catch (error: any) {
      next(new AppError(`Error al eliminar las colecciones: ${error.message}`, 500));
    }
  };
}
