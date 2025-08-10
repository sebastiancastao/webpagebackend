import { Router } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ProjectUserController } from "./project-user.controller";

const router = Router();
const controller = new ProjectUserController();

router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.get("/findUsername/:username", asyncHandler(controller.findUsername.bind(controller)));
router.post("/create", asyncHandler(controller.create.bind(controller)));
router.delete("/remove/:id", asyncHandler(controller.remove.bind(controller)));

export default router;
