import * as tourService from "../services/tour.service.js";

export const getTours = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const tours = await tourService.getTours(page, limit);
        res.status(200).json(tours);
    } catch (error) {
        next(error);
    }
};

export const getTourById = async (req, res, next) => {
    try {
        const getTourById = await tourService.getTourById(req.params.id);
        res.status(200).json(getTourById);
    } catch (error) {
        next(error);
    }       
};

export const createTour = async (req, res, next) => {
    try {
        const createTour = await tourService.createTour(req.body, req.file);
        res.status(201).json(createTour);
    } catch (error) {
        next(error);
    }
};

export const updateTour = async (req, res, next) => {
    try {
        const updateTour = await tourService.updateTour(req.params.id, req.body, req.file);
        res.status(200).json(updateTour);
    } catch (error) {
        next(error);
    }
};

export const deleteTour = async (req, res, next) => {
    try {
        const deleteTour = await tourService.deleteTour(req.params.id);
        res.status(200).json(deleteTour);
    } catch (error) {
        next(error);
    }
};