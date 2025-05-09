import * as packageRepository from "../repositories/package.repository.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";
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
    const { fileUrl, publicId } = await uploadImage(file, "package");

    const dataPackage = {
        title,
        price: parsePrice,
        benefit,
        thumbnail: fileUrl,
        publicId
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
    let publicId = getPackageById.publicId;

    if (file) {
        if (publicId) {
            await deleteImageFromCloudinary(publicId);
        }
        const uploadResult = await uploadImage(file, "package");
        thumbnail = uploadResult.fileUrl;
        publicId = uploadResult.publicId;
    }

    const dataPackage = {
        title,
        price: parsePrice,
        benefit,
        thumbnail,
        publicId
    };

    const updatePackage = await packageRepository.updatePackage(id, dataPackage);
    return updatePackage;
};

export const deletePackage = async (id) => {
    const getPackageById = await packageRepository.getPackageById(id);
    if (!getPackageById) throw new NotFoundError("Package tidak ditemukan");

    if (getPackageById.publicId) {
        await deleteImageFromCloudinary(getPackageById.publicId);
    }

    await packageRepository.deletePackage(id);
    return { message: "Package berhasil dihapus" };
};