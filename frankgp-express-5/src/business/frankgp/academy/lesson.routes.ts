import { Router } from "express";
import { LessonController } from "./lesson.controller";
import { asyncHandler } from "../../../utils/asyncHandler";

const router = Router();
const controller = new LessonController();

router.post("/create", asyncHandler(controller.create.bind(controller)));
router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.get("/findSlug/:slug", asyncHandler(controller.findSlug.bind(controller)));
router.get("/findBySection/:sectionId", asyncHandler(controller.findBySection.bind(controller)));
router.patch("/update/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", asyncHandler(controller.remove.bind(controller)));

export default router;
