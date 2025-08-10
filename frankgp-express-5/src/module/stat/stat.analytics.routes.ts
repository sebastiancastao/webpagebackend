// src/module/stat/stat.analytics.routes.ts

import { Router } from "express";
import { StatAnalyticsController } from "./stat.analytics.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new StatAnalyticsController();

router.get("/summary", asyncHandler(controller.summary.bind(controller)));
router.get("/by-date", asyncHandler(controller.byDate.bind(controller)));
router.get("/by-country", asyncHandler(controller.byCountry.bind(controller)));
router.get("/by-url", asyncHandler(controller.byURL.bind(controller)));
router.get("/by-affiliate", asyncHandler(controller.byAffiliate.bind(controller)));

export default router;
