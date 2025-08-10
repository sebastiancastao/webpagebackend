// src/module/info/info.routes.ts

import { Router } from "express";
import { InfoController } from "./info.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new InfoController();

router.get("/", asyncHandler(controller.info.bind(controller)));

export default router;
