import * as settingRepository from "../repositories/setting.repository.js";
import { settingValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getSettings = async () => {
    return await settingRepository.getSettings();
};

export const getSettingById = async (id) => {
    const setting = await settingRepository.getSettingById(id);
    if (!setting) throw new NotFoundError("Pengaturan tidak ditemukan");
    return setting;
};

export const createSetting = async (data) => {
    const { error } = settingValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { name, category } = data;

    const existingSetting = await settingRepository.getSettingByName(name);
    if (existingSetting) {
        throw new BadRequestError("Duplikasi data", `Pengaturan dengan nama "${name}" sudah ada`);
    }

    const dataSetting = {
        name,
        category
    }
    const createSetting = await settingRepository.createSetting(dataSetting);
    return createSetting;
};

export const updateSetting = async (id, data) => {
    const setting = await settingRepository.getSettingById(id);
    if (!setting) throw new NotFoundError("Pengaturan tidak ditemukan");

    const { error } = settingValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { name, category } = data;

    const dataSetting = {
        name,
        category
    }
    const updateSetting = await settingRepository.updateSetting(id, dataSetting);
    return updateSetting;
};

export const deleteSetting = async (id) => {
    const setting = await settingRepository.getSettingById(id);
    if (!setting) throw new NotFoundError("Pengaturan tidak ditemukan");

    await settingRepository.deleteSetting(id);

    return { message: "Pengaturan berhasil dihapus" };
};