import prisma from "../config/db.js";

export const getGalleries = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [galleries, total] = await Promise.all([
        prisma.gallery.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.gallery.count(),
    ]);

    return {
        data: galleries,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    };
};

export const getGalleryById = async (id) => prisma.gallery.findUnique({ where: { id } });

export const createGallery = async (data) => prisma.gallery.create({ data });

export const updateGallery = async (id, data) => prisma.gallery.update({ where: { id }, data });

export const deleteGallery = async (id) => prisma.gallery.delete({ where: { id } });
