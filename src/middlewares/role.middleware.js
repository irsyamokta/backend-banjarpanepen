import { getUserById } from "../repositories/user.repository.js";
export const hasRole = (...roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: "unauthorized",
                message: "Silakan login terlebih dahulu"
            });
        }

        const user = await getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                status: "not_found",
                message: "User tidak ditemukan"
            });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({
                status: "forbidden",
                message: `Anda tidak memiliki akses sebagai ${roles}`
            });
        }

        next();
    };
};