import * as eventRepository from "../repositories/event.repository.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";
import { eventValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getEvents = async (page, limit) => {
    const events = await eventRepository.getEvents(page, limit);
    return events;
};

export const getEventById = async (id) => {
    const event = await eventRepository.getEventById(id);
    if (!event) throw new NotFoundError("Event tidak ditemukan");
    return event;
};

export const createEvent = async (data, file) => {
    const { error } = eventValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, description, date, time, place, price } = data;
    const { fileUrl, publicId } = await uploadImage(file, "event");

    const parsePrice = parseInt(price, 10);
    const pasrseDate = new Date(date);

    const dataEvent = {
        title,
        description,
        date: pasrseDate,
        time,
        place,
        price: parsePrice,
        thumbnail: fileUrl,
        publicId
    };

    const createEvent = await eventRepository.createEvent(dataEvent);
    return createEvent;
};

export const updateEvent = async (id, data, file) => {
    const event = await eventRepository.getEventById(id);
    if (!event) throw new NotFoundError("Event tidak ditemukan");

    const { error } = eventValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, description, date, time, place, price } = data;
    let thumbnail = event.thumbnail;
    let publicId = event.publicId;

    if (file) {
        if (publicId) {
            await deleteImageFromCloudinary(publicId);
        }
        const uploadResult = await uploadImage(file, "event");
        thumbnail = uploadResult.fileUrl;
        publicId = uploadResult.publicId;
    }

    const parsePrice = parseInt(price, 10);
    const pasrseDate = new Date(date);

    const dataEvent = {
        title,
        description,
        date: pasrseDate,
        time,
        place,
        price: parsePrice,
        thumbnail,
        publicId
    };

    const updateEvent = await eventRepository.updateEvent(id, dataEvent);
    return updateEvent;
};

export const deleteEvent = async (id) => {
    const event = await eventRepository.getEventById(id);
    if (!event) throw new NotFoundError("Event tidak ditemukan");

    if (event.publicId) {
        await deleteImageFromCloudinary(event.publicId);
    }

    await eventRepository.deleteEvent(id);
    return { message: "Event berhasil dihapus" };
};