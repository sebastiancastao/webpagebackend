import { AppError } from "../middleware/error.middleware";
import { AuthMongoDBService } from "./auth.mongodb.service";
import { AuthSQLService } from "./auth.sql.service";
import { ENV_MONGO } from "../config/envs";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// const service = new AuthMongoDBService();
const service = ENV_MONGO.USE_IN_AUTH ? new AuthMongoDBService() : new AuthSQLService();

export class AuthController {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as any;
      if (!user || !user.email) throw new AppError("Unauthorized", 401);

      const dbUser = await service.getUserByEmail(user.email);
      if (!dbUser) throw new AppError("User not found", 404);

      res.json({
        success: true,
        user: dbUser,
      });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.login(req.body);
      if (!result) throw new AppError("Invalid credentials", 401);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyToken = req.body?.token;
      const authHeader = req.headers.authorization;
      const tokenFromHeader = authHeader?.split(" ")[1];

      const token = bodyToken || tokenFromHeader;
      if (!token) throw new AppError("Authorization token missing", 401);

      const decoded = service.decodeToken(token);
      if (!decoded) throw new AppError("Invalid or expired token", 401);

      res.json({ decoded });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyToken = req.body?.refreshToken;
      const authHeader = req.headers.authorization;
      const tokenFromHeader = authHeader?.split(" ")[1];

      const token = bodyToken || tokenFromHeader;
      if (!token) throw new AppError("Refresh token missing", 401);

      const payload = service.verifyRefreshToken(token);
      if (!payload) throw new AppError("Invalid or expired refresh token", 401);

      const { email, sub, userId, roles } = payload as JwtPayload;
      const newTokens = service.generateTokens({ email, sub, userId, roles });
      res.json(newTokens);
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, baseURL } = req.body;
      const token = await service.forgotPassword(email, baseURL);
      // Por ahora solo devolvemos el token (en producción deberías enviarlo por correo)
      res.json({ resetToken: token });
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  }

  async restorePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { resetToken, newPassword } = req.body;
      const success = await service.restorePassword(resetToken, newPassword);

      if (!success) throw new AppError("Failed to reset password", 400);
      res.json({ message: "Password reset successful" });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // No hay lógica en el backend en este caso
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  }

  async checkExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username } = req.query;

      const result = await service.checkExistence({
        email: email?.toString(),
        username: username?.toString(),
      });

      res.json({ exists: result });
    } catch (err) {
      next(err);
    }
  }
}
