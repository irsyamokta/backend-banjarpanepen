import * as tourRepository from "../repositories/tour.repository.js";
import { uploadImage } from "../utils/upload.utils.js";
import { tourValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getTours = async (page, limit) => {
    const tours = await tourRepository.getTours(page, limit);
    return tours;
};

export const getTourById = async (id) => {
    const tour = await tourRepository.getTourById(id);
    if (!tour) throw new NotFoundError("Tour tidak ditemukan");
    return tour;
};

export const createTour = async (data, file) => {
    const { error } = tourValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, about, operational, start, end, facility, maps, price } = data;
    const thumbnail = await uploadImage(file, "tour");

    const parsePrice = parseInt(price, 10);

    const dataTour = {
        title,
        about,
        operational,
        start,
        end,
        facility,
        maps,
        price: parsePrice,
        thumbnail: thumbnail.fileUrl
    };

    const createTour = await tourRepository.createTour(dataTour);
    return createTour;
};

export const updateTour = async (id, data, file) => {
    const tour = await tourRepository.getTourById(id);
    if (!tour) throw new NotFoundError("Tour tidak ditemukan");

    const { error } = tourValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, about, operational, start, end, facility, maps, price } = data;
    const thumbnail = await uploadImage(file, "tour");

    const parsePrice = parseInt(price, 10);

    const dataTour = {
        title,
        about,
        operational,
        start,
        end,
        facility,
        maps,
        price: parsePrice,
        thumbnail: thumbnail.fileUrl
    };

    const updateTour = await tourRepository.updateTour(id, dataTour);
    return updateTour;
};

export const deleteTour = async (id) => {
    const getTourById = await tourRepository.getTourById(id);
    if (!getTourById) throw new NotFoundError("Tour tidak ditemukan");

    const deleteTour = await tourRepository.deleteTour(id);
    return { message: "Wisata berhasil dihapus" };
};