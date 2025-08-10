import { Router } from "express";
import { ShortenerController } from "./shortener.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new ShortenerController();

router.post("/create", asyncHandler(controller.create.bind(controller)));
router.get("/findAll", asyncHandler(controller.findAll.bind(controller)));
router.get("/findAllSelectBackup", asyncHandler(controller.findAllSelectBackup.bind(controller)));
router.get("/findAllFilter", asyncHandler(controller.findAllFilter.bind(controller)));
router.get("/redirect/:code", asyncHandler(controller.redirect.bind(controller)));
router.patch("/update/:id", asyncHandler(controller.update.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.delete("/remove/:id", asyncHandler(controller.remove.bind(controller)));

export default router;
