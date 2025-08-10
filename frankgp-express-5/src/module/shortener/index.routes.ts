// src/routes/index.routes.ts
import { Router } from "express";
import shortenerRoutes from "./shortener.routes";
import visitRoutes from "./shortener-visit.routes";

const router = Router();

router.use("/", shortenerRoutes);
router.use("/visit", visitRoutes);


export default router;


