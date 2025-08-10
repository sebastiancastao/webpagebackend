import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/findAll", CategoryController.findAll);
router.get("/findOne/:id", CategoryController.findOne);
router.post("/create", CategoryController.create);
router.put("/update/:id", CategoryController.update);
router.delete("/remove/:id", CategoryController.remove);

export default router;
