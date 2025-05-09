import crypto from "crypto";
import * as userRepository from "../repositories/user.repository.js"
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";
import { sendVerificationEmail } from "../utils/email/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";
import { updateUserValidator } from "../utils/validators/index.js";

export const getUsers = async () => {
    const user = await userRepository.getUsers();
    return { user };
};

export const getUserByContact = async () => {
    const user = await userRepository.getUserByContact();
    return { user };
}

export const updateUser = async (userId, data, file) => {
    const { error } = updateUserValidator(data);
    if (error) {
        const message = error.details.map(err => err.message);
        throw new BadRequestError("Validasi gagal", message);
    }

    const user = await userRepository.getUserById(userId, { email: true, imageUrl: true, publicId: true });
    if (!user) throw new NotFoundError("Akun tidak ditemukan");

    const { name, phone, email, instagram } = data;
    let profile = user.imageUrl;
    let publicId = user.publicId;

    if (file) {
        if (publicId) {
            await deleteImageFromCloudinary(publicId);
        }
        const uploadResult = await uploadImage(file, "profile");
        profile = uploadResult.fileUrl;
        publicId = uploadResult.publicId;
    }

    let updateData = { name, phone, imageUrl: profile, instagram, publicId: publicId };
    let message = "User profile berhasil diperbarui";

    if (email && email !== user.email) {
        const emailExists = await userRepository.getUserByEmail(email);
        if (emailExists) throw new BadRequestError("Email sudah digunakan!", ["Email sudah terdaftar"]);

        updateData.isVerified = false;
        updateData.verificationToken = crypto.randomBytes(32).toString("hex");

        await sendVerificationEmail(name, email, updateData.verificationToken);
        message = "Email verifikasi telah dikirim";
    }

    const updatedUser = await userRepository.updateUserprofile(userId, updateData);

    return { updatedUser, message };
};

export const deleteUser = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("Akun tidak ditemukan");

    if (user.role === "ADMIN") throw new BadRequestError("Anda tidak memiliki izin untuk menghapus akun ini", ["Tidak dapat menghapus akun"]);

    if (user.publicId) {
        await deleteImageFromCloudinary(user.publicId);
    }

    await userRepository.deleteUser(userId);

    return { message: "Akun berhasil dihapus" };
};