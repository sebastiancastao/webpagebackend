// src/routes/index.routes.ts
import { Router } from "express";
import projectRoutes from "./project.routes";
import projectUserRoutes from "./project-user.routes";

const router = Router();

router.use("/", projectRoutes);
router.use("/user", projectUserRoutes);

export default router;
