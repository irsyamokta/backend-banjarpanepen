import * as packageService from "../services/package.service.js";

export const getPackages = async (req, res, next) => {
    try {
        const packages = await packageService.getPackages();
        res.status(200).json(packages);
    } catch (error) {
        next(error);
    }
};

export const getPackageById = async (req, res, next) => {
    try {
        const getPackageById = await packageService.getPackageById(req.params.id);
        res.status(200).json(getPackageById);
    } catch (error) {
        next(error);
    }       
};

export const createPackage = async (req, res, next) => {
    try {
        const createPackage = await packageService.createPackage(req.body, req.file);
        res.status(201).json(createPackage);
    } catch (error) {
        next(error);
    }
};

export const updatePackage = async (req, res, next) => {
    try {
        const updatePackage = await packageService.updatePackage(req.params.id, req.body, req.file);
        res.status(200).json(updatePackage);
    } catch (error) {
        next(error);
    }
};

export const deletePackage = async (req, res, next) => {
    try {
        const deletePackage = await packageService.deletePackage(req.params.id);
        res.status(200).json(deletePackage);
    } catch (error) {
        next(error);
    }
};