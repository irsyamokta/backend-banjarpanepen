import express from "express";
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from "../controllers/article.controller.js";
import { multerUpload } from "../config/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";

const router = express.Router();
const isAdmin = hasRole("ADMIN");

router.get("/all-article", getArticles);
router.get("/:id", getArticleById);
router.post("/create-article", authMiddleware, isAdmin, multerUpload, createArticle);
router.put("/update-article/:id", authMiddleware, isAdmin, multerUpload, updateArticle);
router.delete("/delete-article/:id", authMiddleware, isAdmin, deleteArticle);

export default router;