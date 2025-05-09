import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import xssClean from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import packageRoutes from "./src/routes/package.routes.js";
import eventRoutes from "./src/routes/event.routes.js";
import galleryRoutes from "./src/routes/gallery.routes.js";
import tourRoutes from "./src/routes/tour.routes.js";
import settingRoutes from "./src/routes/setting.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        res.status(429).json({
            status: "fail",
            message: "Too many requests, please try again later",
        });
    },
});

app.use(limiter);
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(morgan("dev"));
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1", (req, res) => res.send("Server is running"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/package", packageRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/setting", settingRoutes);
app.use("*", (req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Terjadi kesalahan pada server",
        errors: err.details || undefined,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});