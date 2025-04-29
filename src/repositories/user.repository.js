import prisma from "../config/db.js";

export const getUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (userId, selectedField = null) => {
    return prisma.user.findUnique({
        where: { id: userId },
        select: selectedField || undefined
    });
};

export const getUserByEmail = async (email) => prisma.user.findUnique({ where: { email } });

export const updateUserprofile = async (userId, data) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name,
            imageUrl: data.imageUrl
        },
        select: { id: true, name: true, imageUrl: true },
    });
};

export const deleteUser = async (userId) => {
    return prisma.user.delete({
        where: { id: userId }
    });
};
