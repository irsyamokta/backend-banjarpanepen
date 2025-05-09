import * as galleryRepository from "../repositories/gallery.repository.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";
import { galleryValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getGalleries = async (page, limit) => {
    const galleries = await galleryRepository.getGalleries(page, limit);
    return galleries;
};

export const getGalleryById = async (id) => {
    const gallery = await galleryRepository.getGalleryById(id);
    if (!gallery) throw new NotFoundError("Gallery tidak ditemukan");
    return gallery;
};

export const createGallery = async (data, file) => {
    const { error } = galleryValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, caption } = data;
    const { fileUrl, publicId } = await uploadImage(file, "gallery");

    const dataGallery = {
        title,
        caption,
        image: fileUrl,
        publicId
    };

    const createGallery = await galleryRepository.createGallery(dataGallery);
    return createGallery;
};

export const updateGallery = async (id, data, file) => {
    const getGalleryById = await galleryRepository.getGalleryById(id);
    if (!getGalleryById) throw new NotFoundError("Gallery tidak ditemukan");

    const { error } = galleryValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, caption } = data;
    let image = getGalleryById.image;
    let publicId = getGalleryById.publicId;

    if (file) {
        if (publicId); {
            await deleteImageFromCloudinary(publicId);
        }
        const uploadResult = await uploadImage(file, "gallery");
        image = uploadResult.fileUrl;
        publicId = uploadResult.publicId;
    }

    const dataGallery = {
        title,
        caption,
        image,
        publicId
    };

    const updateGallery = await galleryRepository.updateGallery(id, dataGallery);
    return updateGallery;
};

export const deleteGallery = async (id) => {
    const getGalleryById = await galleryRepository.getGalleryById(id);
    if (!getGalleryById) throw new NotFoundError("Gallery tidak ditemukan");

    if (getGalleryById.publicId) {
        await deleteImageFromCloudinary(getGalleryById.publicId);
    }

    await galleryRepository.deleteGallery(id);
    return { message: "Gallery berhasil dihapus" };
};