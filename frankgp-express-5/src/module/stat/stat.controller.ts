// src/module/stat/stat.controller.ts

import { Request, Response, NextFunction } from "express";
import { StatService } from "./stat.service";
import { AppError } from "../../middleware/error.middleware";

const service = new StatService();

export class StatController {
  async track(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await service.track(data);
      res.status(201).json({ status: "ok", data: result });
    } catch (err: any) {
      next(new AppError(err.message || "Internal Error", 500));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.findAll();
      res.status(200).json(result);
    } catch (err: any) {
      next(new AppError(err.message || "Internal Error", 500));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) throw new AppError("Invalid ID", 400);

      const stat = await service.findOne(id);
      if (!stat) throw new AppError("Not found", 404);

      res.json(stat);
    } catch (err: any) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) throw new AppError("Invalid ID", 400);

      await service.remove(id);
      res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }

  async ipapi_co_json(req: Request, res: Response, next: NextFunction) {
    res.json({
      ip: "2803:a3e0:18c2:6030:2c99:967d:9f53:7f2e",
      network: "2803:a3e0:18c0::/42",
      version: "IPv6",
      city: "Juliaca",
      region: "Puno",
      region_code: "PUN",
      country: "PE",
      country_name: "Peru",
      country_code: "PE",
      country_code_iso3: "PER",
      country_capital: "Lima",
      country_tld: ".pe",
      continent_code: "SA",
      in_eu: false,
      postal: null,
      latitude: -15.4991,
      longitude: -70.1339,
      timezone: "America/Lima",
      utc_offset: "-0500",
      country_calling_code: "+51",
      currency: "PEN",
      currency_name: "Sol",
      languages: "es-PE,qu,ay",
      country_area: 1285220,
      country_population: 31989256,
      asn: "AS270068",
      org: "DESARROLLO DE INFRAESTRUCTURA DE TELECOMUNICACIONES PERU S.A.C. INFRATEL",
    });
  }
}
