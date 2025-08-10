// src/module/shortener/shortener-visit.routes.ts

import { Router } from "express";
import { ShortenerVisitController } from "./shortener-visit.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new ShortenerVisitController();

router.get("/", asyncHandler(controller.findAll.bind(controller)));
router.get("/:id", asyncHandler(controller.findByShortenerId.bind(controller)));

export default router;
