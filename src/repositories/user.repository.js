import prisma from "../config/db.js";

export const getUsers = async () => {
    return prisma.user.findMany();
};

export const getUserByContact = async () => {
    return prisma.user.findMany({select: {phone: true, instagram: true}});
}

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
            phone: data.phone,
            imageUrl: data.imageUrl,
            instagram: data.instagram
        },
        select: { id: true, name: true, phone: true, imageUrl: true, instagram: true },
    });
};

export const deleteUser = async (userId) => {
    return prisma.user.delete({
        where: { id: userId }
    });
};
