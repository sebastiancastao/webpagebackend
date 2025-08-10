// src/module/visit/visit.routes.ts
import { Router } from "express";
import { VisitController } from "./visit.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new VisitController();

router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/findAllMock", asyncHandler(controller.findAllMock.bind(controller)));

export default router;
