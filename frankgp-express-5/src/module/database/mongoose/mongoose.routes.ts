// src/module/database/database.routes.ts

import { asyncHandler } from "../../../utils/asyncHandler";
import { Router } from "express";
import { MongooseController } from "./mongoose.controller";

const router = Router();
const controller = new MongooseController();

router.post("/backup", asyncHandler(controller.backup.bind(controller)));
router.delete("/drop", asyncHandler(controller.dropCollections.bind(controller))); // 🆕

export default router;
