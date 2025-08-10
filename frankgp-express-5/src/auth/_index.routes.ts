import { Router } from "express";

import authRoutes from "./auth.routes";
import googleRoutes from "./oauth.routes";
import usersRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/oauth", googleRoutes);
router.use("/users", usersRoutes);

export default router;
