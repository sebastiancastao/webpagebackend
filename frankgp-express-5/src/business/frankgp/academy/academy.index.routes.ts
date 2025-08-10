import { Router } from "express";
import coursesRoutes from "./courses.routes";
import lessonRoutes from "./lesson.routes";
import sectionRoutes from "./section.routes";
import categoryRoutes from "./category.routes";

const router = Router();

router.use("/courses", coursesRoutes);
router.use("/lessons", lessonRoutes);
router.use("/sections", sectionRoutes);
router.use("/categories", categoryRoutes);

export default router;
