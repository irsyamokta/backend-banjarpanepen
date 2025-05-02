import express from "express";
import { getGalleries, getGalleryById, createGallery, deleteGallery, updateGallery } from "../controllers/gallery.controller.js";
import { multerUpload } from "../config/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-gallery", getGalleries);
router.get("/:id", getGalleryById);
router.post("/create-gallery", authMiddleware, isAdmin, multerUpload, createGallery);
router.patch("/update-gallery/:id", authMiddleware, isAdmin, multerUpload, updateGallery);
router.delete("/delete-gallery/:id", authMiddleware, isAdmin, deleteGallery);

export default router;