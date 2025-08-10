import { Request, Response, NextFunction } from "express";
import { ShortenerService } from "./shortener.service";
import { AppError } from "../../middleware/error.middleware";

const service = new ShortenerService();

export class ShortenerController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const urls = await service.findAll();
      res.json(urls);
    } catch (err) {
      next(err);
    }
  }

  async findAllSelectBackup(req: Request, res: Response, next: NextFunction) {
    try {
      const urls = await service.findAllSelectBackup();
      res.json(urls);
    } catch (err) {
      next(err);
    }
  }

  async findAllFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = req.query;

      const result = await service.findAllFilter({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        dateVisitFrom: dateVisitFrom as string,
        dateVisitTo: dateVisitTo as string,
        sortVisitCount: sortVisitCount as "ASC" | "DESC",
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { destination, backHalf } = req.body;
      const result = await service.create(destination, backHalf);
      res.status(201).json(result);
    } catch (err: any) {
      next(new AppError(err.message || "Internal Error", 400));
    }
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const record = await service.findByCode(code);

      if (!record) return next(); // Si no existe, continúa a React u otro middleware

      // 👁️ Obtener datos del request
      const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress) as string;
      const userAgent = req.headers["user-agent"] || "";
      const referrer = req.headers["referer"] || "";

      // Registrar la visita
      await service.registerVisit(record.id, { ip, userAgent, referrer });

      res.redirect(record.destination);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await service.findOne(id);
      if (!result) throw new AppError("Short URL not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deleted = await service.remove(id);
      if (!deleted) throw new AppError("Short URL not found", 404);
      res.json({ message: "Short URL deleted" });
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { destination, backHalf } = req.body;
      const result = await service.update(id, { destination, backHalf });
      if (!result) throw new AppError("Short URL not found", 404);
      res.json(result);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }
}
