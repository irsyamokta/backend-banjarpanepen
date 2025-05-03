import { bucket } from "../config/multer.js";
import { BadRequestError } from "./errors.utils.js";

export const uploadImage = async (file, category) => {
    if (file) {
        const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedImageTypes.includes(file.mimetype)) {
            throw new BadRequestError("Hanya file gambar yang diperbolehkan!", ["Upload image error"]);
        }

        let folder = "images";
        if (category === "profile") folder = `${folder}/profile`;
        if (category === "article") folder = `${folder}/article`;
        if (category === "package") folder = `${folder}/package`;
        if (category === "event") folder = `${folder}/event`;
        if (category === "gallery") folder = `${folder}/gallery`;
        if (category === "tour") folder = `${folder}/tour`;

        const fileUrl = await uploadToGCS(file, folder);
        return { message: "Gambar berhasil diupload!", fileUrl };
    } else {
        return { message: "No file uploaded" };
    }
};

const uploadToGCS = (file, folder) => {
    return new Promise((resolve, reject) => {
        const uniqueFilename = `${folder}/${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(uniqueFilename);

        const blobStream = fileUpload.createWriteStream({
            metadata: { contentType: file.mimetype }
        });

        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", async () => {
            try {
                const fileUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFilename}`;
                resolve(fileUrl);
            } catch (err) {
                reject(err);
            }
        });

        blobStream.end(file.buffer);
    });
};

export const deleteImageFromGCS = async (fileUrl) => {
    try {
        const filePath = fileUrl.replace(`https://storage.googleapis.com/${bucket.name}/`, '');
        const file = bucket.file(filePath);

        await file.delete();
    } catch (err) {
        throw new BadRequestError("Gagal menghapus gambar!", ["Delete image error"]);
    }
};
