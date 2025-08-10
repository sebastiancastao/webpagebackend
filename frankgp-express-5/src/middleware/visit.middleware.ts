// src/middleware/visit.middleware.ts
import { Request, Response, NextFunction } from "express";
import { VisitEntity } from "../module/visit/visit.entity";

// Arreglo en memoria para almacenar visitas
export const visitDataMock: VisitEntity[] = [];

export function countVisitMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const visit: VisitEntity = {
      id: visitDataMock.length + 1, // simulamos un ID incremental
      path: req.path,
      visitedAt: new Date(),
    };
    visitDataMock.push(visit);
  } catch (err) {
    console.error("Error saving visit (mock):", err);
  }
  next();
}
