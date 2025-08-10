// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { ENV_JWT } from "../config/envs";

interface CustomRequest extends Request {
  user: any;
}

export const requireRole = (roles: string | string[]) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError("Missing token", 401);

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, ENV_JWT.ACCESS_TOKEN_SECRET) as any;
      if (!decoded.roles || !decoded.roles.some((r: string) => allowedRoles.includes(r))) {
        throw new AppError("Insufficient permissions", 403);
      }
      req.user = decoded;
      next();
    } catch (err) {
      next(new AppError("Invalid or expired token", 401));
    }
  };
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader /* || !authHeader.startsWith("Bearer ") */) {
    return next(new AppError("Token no proporcionado", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV_JWT.ACCESS_TOKEN_SECRET);
    (req as CustomRequest).user = decoded;
    next();
  } catch (error) {
    next(new AppError("Token inválido o expirado", 401));
  }
};
