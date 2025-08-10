import { Router } from "express";
import { MenuItemController } from "./menu.controller";

const router = Router();

router.get("/getAll", MenuItemController.getAll);
router.get("/getOne/:id", MenuItemController.getOne);
router.post("/create", MenuItemController.create);
router.put("/update/:id", MenuItemController.update);
router.delete("/remove/:id", MenuItemController.remove);

export default router;
