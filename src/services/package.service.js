import * as packageRepository from "../repositories/package.repository.js";
import { uploadImage, deleteImageFromGCS } from "../utils/upload.utils.js";
import { packageValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getPackages = async (page, limit) => {
    const packages = await packageRepository.getPackages(page, limit);
    return packages;
};

export const getPackageById = async (id) => {
    const getPackageById = await packageRepository.getPackageById(id);
    if (!getPackageById) throw new NotFoundError("Package tidak ditemukan");
    return getPackageById;
};

export const createPackage = async (data, file) => {
    const { error } = packageValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, price, benefit } = data;

    const parsePrice = parseInt(price, 10);
    const thumbnail = await uploadImage(file, "package");

    const dataPackage = {
        title,
        price: parsePrice,
        benefit,
        thumbnail: thumbnail.fileUrl
    };

    const createPackage = await packageRepository.createPackage(dataPackage);
    return createPackage;
};

export const updatePackage = async (id, data, file) => {
    const getPackageById = await packageRepository.getPackageById(id);
    if (!getPackageById) throw new NotFoundError("Package tidak ditemukan");

    const { error } = packageValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, price, benefit } = data;

    const parsePrice = parseInt(price, 10);
    let thumbnail = getPackageById.thumbnail;

    if (file) {
        if (thumbnail) {
            await deleteImageFromGCS(thumbnail);
        }
        const uploadResult = await uploadImage(file, "package");
        thumbnail = uploadResult.fileUrl;
    }

    const dataPackage = {
        title,
        price: parsePrice,
        benefit,
        thumbnail: thumbnail
    };

    const updatePackage = await packageRepository.updatePackage(id, dataPackage);
    return updatePackage;
};

export const deletePackage = async (id) => {
    const getPackageById = await packageRepository.getPackageById(id);
    if (!getPackageById) throw new NotFoundError("Package tidak ditemukan");

    if (getPackageById.thumbnail) {
        await deleteImageFromGCS(getPackageById.thumbnail);
    }

    await packageRepository.deletePackage(id);
    return { message: "Package berhasil dihapus" };
};