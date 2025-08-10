// src/module/feedback/feedback.routes.ts
import { Router } from "express";
import { FeedbackController } from "./feedback.controller";
import { verifyToken } from "../../../../middleware/auth.middleware";

const router = Router();

router.get("/getAll", /* verifyToken, */ FeedbackController.getAll);
router.get("/getOne/:id", verifyToken, FeedbackController.getOne);
router.post("/create", verifyToken, FeedbackController.create);
router.put("/update/:id", verifyToken, FeedbackController.update);
router.delete("/remove/:id", verifyToken, FeedbackController.remove);

export default router;
