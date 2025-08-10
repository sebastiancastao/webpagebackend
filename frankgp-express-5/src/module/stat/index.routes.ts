import { Router } from "express";
import statRoutes from "./stat.routes";
import analyticsRoutes from "./stat.analytics.routes";

const router = Router();

// Ruta base: /api/stat
router.use("/", statRoutes);

// Ruta base: /api/stat/analytics
router.use("/analytics", analyticsRoutes);

export default router;
