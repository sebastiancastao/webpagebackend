// src/module/auth/oauth.controller.ts

import { ENV_GOOGLE, ENV_MONGO } from "../config/envs";
import { OAuthMongoDBService } from "./oauth.mongodb.service";
import { OAuthSQLService } from "./oauth.sql.service";
import { Request, Response } from "express";

const service = ENV_MONGO.USE_IN_AUTH ? new OAuthMongoDBService() : new OAuthSQLService();

export class OAuthController {
  async googleCallback(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = await service.handleOAuth(req.user);
      res.redirect(
        `${ENV_GOOGLE.CLIENT_URL}/auth/login-google?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      console.error("OAuth Callback Error:", error);
      res.status(500).json({ message: "Error al procesar el usuario de Google", error });
    }
  }
}
