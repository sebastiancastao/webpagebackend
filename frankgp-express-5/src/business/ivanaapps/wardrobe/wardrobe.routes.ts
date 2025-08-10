import { Router } from "express";
import { WardrobeController } from "./wardrobe.controller";
import { asyncHandler } from "../../../utils/asyncHandler";
import { verifyToken } from "../../../middleware/auth.middleware";
import { requireRole } from "../../../middleware/auth.middleware";

const router = Router();
const controller = new WardrobeController();

const superAdmin = ["superadmin"];
const admin = ["admin", "superadmin"];
const allRoles = ["user", "admin", "superadmin"];

router.get("/findAll", verifyToken, asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", verifyToken, asyncHandler(controller.findOne.bind(controller)));
router.post("/create", verifyToken, asyncHandler(controller.create.bind(controller)));
router.patch("/update/:id", verifyToken, asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", verifyToken, asyncHandler(controller.remove.bind(controller)));

export default router;
