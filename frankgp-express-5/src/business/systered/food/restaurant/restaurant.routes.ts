// src/module/restaurant/restaurant.routes.ts
import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";

const router = Router();

router.get("/findAll", RestaurantController.findAll);
router.get("/slug/:slug", RestaurantController.getBySlug);
router.get("/waiter/:slug", RestaurantController.getWaitersBySlug);
router.get("/categories/:slug", RestaurantController.getCategoriesBySlug);
router.get("/tables/:slug", RestaurantController.getTablesBySlug);
router.get("/findOne/:id", RestaurantController.findOne);
router.post("/create", RestaurantController.create);
router.put("/update/:id", RestaurantController.update);
router.delete("/remove/:id", RestaurantController.remove);

export default router;
