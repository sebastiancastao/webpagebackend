import { Router } from "express";
import { OptionsController } from "./options.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireRole } from "../../middleware/auth.middleware";

const router = Router();
const controller = new OptionsController();

const adminOnly = ["admin", "superadmin"];

router.post("/create", requireRole(adminOnly), asyncHandler(controller.create.bind(controller)));
router.get("/findAll", requireRole(adminOnly), asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", asyncHandler(controller.findOne.bind(controller)));
router.get("/findByKey/:key", asyncHandler(controller.findByKey.bind(controller)));
router.patch("/update/:id", requireRole(adminOnly), asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", requireRole(adminOnly), asyncHandler(controller.remove.bind(controller)));

router.get("/getBootCount", asyncHandler(controller.getBootCount.bind(controller)));

export default router;
