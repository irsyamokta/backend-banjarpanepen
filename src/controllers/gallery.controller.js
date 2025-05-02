import * as galleryService from "../services/gallery.service.js";

export const getGalleries = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const galleries = await galleryService.getGalleries(page, limit);
        return res.status(200).json(galleries);
    } catch (error) {
        next(error);
    }
};

export const getGalleryById = async (req, res, next) => {
    try {
        const gallery = await galleryService.getGalleryById(req.params.id);
        return res.status(200).json(gallery);
    } catch (error) {
        next(error);
    }
};

export const createGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.createGallery(req.body, req.file);
        return res.status(201).json(gallery);
    } catch (error) {
        next(error);
    }
};

export const updateGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.updateGallery(req.params.id, req.body, req.file);
        return res.status(200).json(gallery);
    } catch (error) {
        next(error);
    }
};

export const deleteGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.deleteGallery(req.params.id);
        return res.status(200).json(gallery);
    } catch (error) {
        next(error);
    }
};