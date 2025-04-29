import express from "express";
import { register, login, logout, refreshToken, me, verifyEmail } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/logout", authMiddleware, logout);

router.post("/refresh", authMiddleware, refreshToken);
router.get("/verify/:token", verifyEmail);

export default router;