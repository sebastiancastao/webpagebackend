// src/module/database/database.routes.ts

import { asyncHandler } from "../../utils/asyncHandler";
import { DBBackupController } from "./db-backup.controller";
import { DBConfigController } from "./db-config.controller";
import { Router } from "express";
import multer from "multer";

const router = Router();
const controller = new DBBackupController();
const controllerConfig = new DBConfigController();
const upload = multer({ dest: "uploads/" });

router.get("/list", asyncHandler(controller.list.bind(controller)));
router.get("/download/:filename", asyncHandler(controller.download.bind(controller)));
router.post("/backup", asyncHandler(controller.backup.bind(controller)));
router.post("/backupNodeJS", asyncHandler(controller.backupNodeJS.bind(controller)));
router.patch("/restore/:backupfile", asyncHandler(controller.restore.bind(controller)));
router.patch("/restoreNodeJS/:backupfile", asyncHandler(controller.restoreNodeJS.bind(controller)));
router.patch("/rename/:filename", asyncHandler(controller.rename.bind(controller)));
router.delete("/delete/:filename", asyncHandler(controller.delete.bind(controller)));
router.post("/upload", upload.single("file"), asyncHandler(controller.upload.bind(controller)));

router.post("/config/dropAndSync", asyncHandler(controllerConfig.dropAndSync.bind(controllerConfig)));
router.post("/config/runSeeders", asyncHandler(controllerConfig.runSeeders.bind(controllerConfig)));
router.post("/config/dropAndSeed", asyncHandler(controllerConfig.dropAndSeed.bind(controllerConfig)));
router.post("/config/runSQLQuery", asyncHandler(controllerConfig.runSQLQuery.bind(controllerConfig)));

export default router;
