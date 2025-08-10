import { Router } from "express";
import { EmailController } from "./email.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();
const controller = new EmailController();

router.post("/submit", asyncHandler(controller.submit.bind(controller)));

export default router;
