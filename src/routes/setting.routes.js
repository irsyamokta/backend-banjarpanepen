import express from "express";
import { getSettings, getSettingById, createSetting, updateSetting, deleteSetting } from "../controllers/setting.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-setting", getSettings);
router.get("/:id", isAdmin, getSettingById);
router.post("/create-setting", authMiddleware, isAdmin, createSetting);
router.patch("/update-setting/:id", authMiddleware, isAdmin, updateSetting);
router.delete("/delete-setting/:id", authMiddleware, isAdmin, deleteSetting);

export default router;