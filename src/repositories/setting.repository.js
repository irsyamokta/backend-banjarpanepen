import prisma from "../config/db.js";

export const getSettings = async () => prisma.selectOption.findMany();

export const getSettingById = async (id) => prisma.selectOption.findUnique({ where: { id } });

export const getSettingByName = async (name) => prisma.selectOption.findFirst({ where: { name } })

export const createSetting = async (data) => prisma.selectOption.create({ data });

export const updateSetting = async (id, data) => prisma.selectOption.update({ where: { id }, data });

export const deleteSetting = async (id) => prisma.selectOption.delete({ where: { id } });