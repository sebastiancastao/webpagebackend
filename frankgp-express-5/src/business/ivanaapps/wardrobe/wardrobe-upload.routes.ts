// src/ivanaapps/wardrobe/wardrobe-upload.routes.ts

import { Router } from "express";
import { WardrobeUploadController } from "./wardrobe-upload.controller";
import { asyncHandler } from "../../../utils/asyncHandler";
import { verifyToken } from "../../../middleware/auth.middleware";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
const controller = new WardrobeUploadController();

const uploadDir = path.resolve(__dirname, "../../../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/image",
  //   verifyToken,
  upload.single("image"),
  asyncHandler(controller.uploadItem.bind(controller))
);

router.get(
  "/image",
  // verifyToken,
  asyncHandler(controller.getItem.bind(controller))
);

export default router;
