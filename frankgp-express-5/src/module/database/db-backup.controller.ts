// src/module/database/db-backup.controller.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../../middleware/error.middleware";
import { DBBackupService } from "./db-backup.service";

export class DBBackupController {
  private dbBackupService = new DBBackupService();

  public backup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.dbBackupService.backup();
      res.json({ message: result });
    } catch (error: any) {
      next(new AppError(`Error al generar el backup: ${error.message}`, 500));
    }
  };

  public backupNodeJS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.dbBackupService.backupNodeJS();
      res.json({ message: result });
    } catch (error: any) {
      next(new AppError(`Error al generar el backup: ${error.message}`, 500));
    }
  };

  public restore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { backupfile } = req.params;
    try {
      const result = await this.dbBackupService.restore(backupfile);
      res.json({ message: result });
    } catch (error: any) {
      next(new AppError(`Error al restaurar la base de datos: ${error.message}`, 500));
    }
  };

  public restoreNodeJS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { backupfile } = req.params;
    try {
      const result = await this.dbBackupService.restoreNodeJS(backupfile);
      res.json({ message: result });
    } catch (error: any) {
      next(new AppError(`Error al restaurar la base de datos: ${error.message}`, 500));
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const backups = this.dbBackupService.list();
      res.json({ backups });
    } catch (error: any) {
      next(new AppError(`Error al listar los backups: ${error.message}`, 500));
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filename } = req.params;
      this.dbBackupService.delete(filename);
      res.status(200).json({ message: "Backup eliminado" });
    } catch (error: any) {
      next(new AppError(`Error al eliminar el backup: ${error.message}`, 500));
    }
  };

  public rename = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filename } = req.params;
      const { newName } = req.body;

      if (!newName || !newName.endsWith(".sql")) {
        throw new AppError("El nuevo nombre debe tener la extensión .sql", 400);
      }

      this.dbBackupService.rename(filename, newName);
      res.status(200).json({ message: "Backup renombrado", newName });
    } catch (error: any) {
      next(new AppError(`Error al renombrar el backup: ${error.message}`, 500));
    }
  };

  public download = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { filename } = req.params;

    try {
      const filePath = this.dbBackupService.getBackupFilePath(filename);

      res.download(filePath, filename, (err) => {
        if (err) {
          next(new AppError("Error downloading the backup file", 500));
        }
      });
    } catch (error: any) {
      next(new AppError(error.message, 404));
    }
  };

  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new AppError("No file uploaded", 400);
      }

      const { originalname, path: tempPath } = req.file;

      const filename = await this.dbBackupService.uploadFile(tempPath, originalname);

      res.status(200).json({ message: "File uploaded successfully", filename });
    } catch (err) {
      next(err);
    }
  }
}
