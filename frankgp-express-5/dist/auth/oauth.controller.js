"use strict";
// src/module/auth/oauth.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthController = void 0;
const envs_1 = require("../config/envs");
const oauth_mongodb_service_1 = require("./oauth.mongodb.service");
const oauth_sql_service_1 = require("./oauth.sql.service");
const service = envs_1.ENV_MONGO.USE_IN_AUTH ? new oauth_mongodb_service_1.OAuthMongoDBService() : new oauth_sql_service_1.OAuthSQLService();
class OAuthController {
    async googleCallback(req, res) {
        try {
            const { accessToken, refreshToken } = await service.handleOAuth(req.user);
            res.redirect(`${envs_1.ENV_GOOGLE.CLIENT_URL}/auth/login-google?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        }
        catch (error) {
            console.error("OAuth Callback Error:", error);
            res.status(500).json({ message: "Error al procesar el usuario de Google", error });
        }
    }
}
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map