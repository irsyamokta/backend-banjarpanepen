import * as eventService from "../services/event.service.js";

export const getEvents = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const events = await eventService.getEvents(page, limit);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(req.body, req.file);
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const event = await eventService.updateEvent(req.params.id, req.body, req.file);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const event = await eventService.deleteEvent(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};