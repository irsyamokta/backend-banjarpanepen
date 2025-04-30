import prisma from "../config/db.js";

export const getPackages = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [packages, total] = await Promise.all([
        prisma.tourPackage.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.tourPackage.count(),
    ]);

    return {
        data: packages,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    };
};

export const getPackageById = async (id) => prisma.tourPackage.findUnique({ where: { id } });

export const createPackage = async (data) => prisma.tourPackage.create({ data });

export const updatePackage = async (id, data) => prisma.tourPackage.update({ where: { id }, data }); 

export const deletePackage = async (id) => prisma.tourPackage.delete({ where: { id } });