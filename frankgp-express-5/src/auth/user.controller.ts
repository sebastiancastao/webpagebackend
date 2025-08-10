import { AppError } from "../middleware/error.middleware";
import { Request, Response, NextFunction } from "express";
import { UsersMongoDBService } from "./user.mogodb.service";
import { UsersSQLService } from "./user.sql.service";
import { ENV_MONGO } from "../config/envs";

const service = ENV_MONGO.USE_IN_AUTH ? new UsersMongoDBService() : new UsersSQLService();

export class UsersController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.findOne(req.params.id);
      if (!user) throw new AppError("User not found", 404);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.update(req.params.id, req.body);
      if (!user) throw new AppError("User not found", 404);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await service.remove(req.params.id);
      if (!success) throw new AppError("User not found", 404);
      res.json({ message: "User deleted" });
    } catch (err) {
      next(err);
    }
  }
}
