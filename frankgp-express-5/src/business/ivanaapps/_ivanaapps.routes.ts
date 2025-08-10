import { Router } from "express";
import wardrobeRoutes from "./wardrobe/wardrobe.routes";
import wardrobeUserRoutes from "./wardrobe-user/wardrobe-user.routes";
import wardrobeUploadRoutes from "./wardrobe/wardrobe-upload.routes";
import outfitRoutes from "./outfit/outfit.routes";

const router = Router();

router.use("/wardrobe", wardrobeRoutes);
router.use("/wardrobe-users", wardrobeUserRoutes);
router.use("/wardrobe-upload", wardrobeUploadRoutes);
router.use("/outfits", outfitRoutes);

export default router;
