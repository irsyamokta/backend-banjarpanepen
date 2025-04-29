import express from "express";
import { multerUpload } from "../config/multer.js";
import { getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-user", authMiddleware, isAdmin, getUsers)
router.put("/update/:userId", authMiddleware, isAdmin, multerUpload, updateUser);
router.delete("/delete/:userId", authMiddleware, isAdmin, deleteUser);

export default router;