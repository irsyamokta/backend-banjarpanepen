import express from "express";
import { getTours, getTourById, createTour, updateTour, deleteTour } from "../controllers/tour.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { multerUpload } from "../config/multer.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-tour", getTours);
router.get("/:id", getTourById);
router.post("/create-tour", authMiddleware, isAdmin, multerUpload, createTour);
router.patch("/update-tour/:id", authMiddleware, isAdmin, multerUpload, updateTour);
router.delete("/delete-tour/:id", authMiddleware, isAdmin, deleteTour);

export default router;