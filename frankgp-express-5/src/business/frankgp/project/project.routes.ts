import { Router } from "express";
import { ProjectController } from "./project.controller";
import { asyncHandler } from "../../../utils/asyncHandler";

const router = Router();
const controller = new ProjectController();

router.post("/create", asyncHandler(controller.create.bind(controller)));
router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.get("/findOneSlug/:slug", asyncHandler(controller.findOneSlug.bind(controller)));
router.patch("/update/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", asyncHandler(controller.remove.bind(controller)));

export default router;
