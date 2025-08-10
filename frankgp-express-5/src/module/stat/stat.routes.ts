// src/module/stat/stat.routes.ts

import { Router } from "express";
import { StatController } from "./stat.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new StatController();

router.post("/track", asyncHandler(controller.track.bind(controller)));
router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/ipapi_co_json", asyncHandler(controller.ipapi_co_json.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.delete("/remove/:id", asyncHandler(controller.remove.bind(controller)));

export default router;
