import * as galleryRepository from "../repositories/gallery.repository.js";
import { uploadImage } from "../utils/upload.utils.js";
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
    const image = await uploadImage(file, "gallery");

    const dataGallery = {
        title,
        caption,
        image: image.fileUrl
    };

    const createGallery = await galleryRepository.createGallery(dataGallery);
    return createGallery;
};

export const deleteGallery = async (id) => {
    const getGalleryById = await galleryRepository.getGalleryById(id);
    if (!getGalleryById) throw new NotFoundError("Gallery tidak ditemukan");

    await galleryRepository.deleteGallery(id);
    return { message: "Gallery berhasil dihapus" };
};