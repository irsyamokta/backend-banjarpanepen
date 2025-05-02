import express from "express";
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { multerUpload } from "../config/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-event", getEvents);
router.get("/:id", getEventById);
router.post("/create-event", authMiddleware, isAdmin, multerUpload, createEvent);
router.patch("/update-event/:id", authMiddleware, isAdmin, multerUpload, updateEvent);
router.delete("/delete-event/:id", authMiddleware, isAdmin, deleteEvent);

export default router;