import express from "express";
import { getPackages, getPackageById, createPackage, updatePackage, deletePackage } from "../controllers/package.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { multerUpload } from "../config/multer.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-package", getPackages);
router.get("/:id", getPackageById);
router.post("/create-package", authMiddleware, isAdmin, multerUpload, createPackage);
router.put("/update-package/:id", authMiddleware, isAdmin, multerUpload, updatePackage);
router.delete("/delete-package/:id", authMiddleware, isAdmin, deletePackage);

export default router;