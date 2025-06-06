import * as userService from "../services/user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getUserByContact = async (req, res, next) => {
    try {
        const result = await userService.getUserByContact();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { result, message } = await userService.updateUser(req.user.id, req.body, req.file);
        res.status(200).json({ message, data: result });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try { 
        const result = await userService.deleteUser(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};