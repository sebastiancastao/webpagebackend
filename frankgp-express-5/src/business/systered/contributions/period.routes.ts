import { Router } from "express";
import { PeriodController } from "./period.controller";
import { asyncHandler } from "../../../utils/asyncHandler";
import { verifyToken } from "../../../middleware/auth.middleware";

const router = Router();
const controller = new PeriodController();

// Todas protegidas por token
router.get("/findAll", verifyToken, asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", verifyToken, asyncHandler(controller.findOne.bind(controller)));
router.post("/create", verifyToken, asyncHandler(controller.create.bind(controller)));
router.patch("/update/:id", verifyToken, asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", verifyToken, asyncHandler(controller.remove.bind(controller)));

export default router;
