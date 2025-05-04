import * as eventRepository from "../repositories/event.repository.js";
import { uploadImage, deleteImageFromGCS } from "../utils/upload.utils.js";
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
    const thumbnail = await uploadImage(file, "event");

    const parsePrice = parseInt(price, 10);
    const pasrseDate = new Date(date);

    const dataEvent = {
        title,
        description,
        date: pasrseDate,
        time,
        place,
        price: parsePrice,
        thumbnail: thumbnail.fileUrl
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

    if (file) {
        if (thumbnail) {
            await deleteImageFromGCS(thumbnail);
        }
        const uploadResult = await uploadImage(file, "event");
        thumbnail = uploadResult.fileUrl;
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
        thumbnail: thumbnail
    };

    const updateEvent = await eventRepository.updateEvent(id, dataEvent);
    return updateEvent;
};

export const deleteEvent = async (id) => {
    const event = await eventRepository.getEventById(id);
    if (!event) throw new NotFoundError("Event tidak ditemukan");

    if (event.thumbnail) {
        await deleteImageFromGCS(event.thumbnail);
    }

    await eventRepository.deleteEvent(id);
    return { message: "Event berhasil dihapus" };
};