// src/module/auth/auth.routes.ts
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", asyncHandler(authController.register.bind(authController)));
router.post("/login", asyncHandler(authController.login.bind(authController)));
router.post("/loginNoCaptcha", asyncHandler(authController.login.bind(authController)));
router.post("/forgot-password", asyncHandler(authController.forgotPassword.bind(authController)));
router.post("/restore-password", asyncHandler(authController.restorePassword.bind(authController)));
router.get("/check-existence", asyncHandler(authController.checkExistence.bind(authController)));

router.get("/me", verifyToken, asyncHandler(authController.me.bind(authController)));
router.post("/decode-token", asyncHandler(authController.decodeToken.bind(authController)));
router.post("/refresh-token", asyncHandler(authController.refreshToken.bind(authController)));
router.post("/logout", asyncHandler(authController.logout.bind(authController)));

export default router;
