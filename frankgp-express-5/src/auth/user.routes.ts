import { Router } from "express";
import { UsersController } from "./user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/auth.middleware";
import roleController from "./user.role.controller";

const router = Router();
const controller = new UsersController();

const superAdmin = ["superadmin"];
const admin = ["admin", "superadmin"];
const allRoles = ["user", "admin", "superadmin"];

// ✅ Proteger rutas con verifyToken
router.get("/findAll", verifyToken, asyncHandler(controller.findAll.bind(controller)));
router.get("/findOne/:id", verifyToken, asyncHandler(controller.findOne.bind(controller)));
router.post("/create", verifyToken, asyncHandler(controller.create.bind(controller)));
router.patch("/update/:id", verifyToken, asyncHandler(controller.update.bind(controller)));
router.delete("/remove/:id", verifyToken, asyncHandler(controller.remove.bind(controller)));

// allRoles
router.get("/allRoles", verifyToken, requireRole(allRoles), asyncHandler(roleController.allRoles.bind(roleController)));

// admin
router.get("/admin", verifyToken, requireRole(admin), asyncHandler(roleController.admin.bind(roleController)));

// superAdmin
router.get(
  "/superAdmin",
  verifyToken,
  requireRole(superAdmin),
  asyncHandler(roleController.superAdmin.bind(roleController))
);

export default router;
