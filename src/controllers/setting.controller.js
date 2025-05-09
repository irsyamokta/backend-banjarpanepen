import * as settingService from "../services/setting.service.js";

export const getSettings = async (req, res, next) => {
    try {
        const settings = await settingService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};

export const getSettingById = async (req, res, next) => {
    try {
        const setting = await settingService.getSettingById(req.params.id);
        res.status(200).json(setting);
    } catch (error) {
        next(error);
    }
};

export const createSetting = async (req, res, next) => {
    try {
        const setting = await settingService.createSetting(req.body);
        res.status(201).json(setting);
    } catch (error) {
        next(error);
    }
};

export const updateSetting = async (req, res, next) => {
    try {
        const setting = await settingService.updateSetting(req.params.id, req.body);
        res.status(200).json(setting);
    } catch (error) {
        next(error);
    }
};

export const deleteSetting = async (req, res) => {
    try {
        const setting = await settingService.deleteSetting(req.params.id);
        res.status(200).json(setting);
    } catch (error) {
        next(error);
    }
};