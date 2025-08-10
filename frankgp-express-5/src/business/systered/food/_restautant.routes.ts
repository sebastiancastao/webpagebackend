import { Router } from "express";
import CategoryRoutes from "./restaurant-category/category.routes";
import MenuItemRoutes from "./restaurant-menu/menu.routes";
import RestaurantRoutes from "./restaurant/restaurant.routes";
import FeedbackRoutes from "./restaurant-feedback/feedback.routes";

const router = Router();

router.use("/restaurant", RestaurantRoutes);
router.use("/restaurant/category", CategoryRoutes);
router.use("/restaurant/menu", MenuItemRoutes);
// router.use("/restaurant/table", MenuItemRoutes);
router.use("/restaurant/feedback", FeedbackRoutes);

export default router;
