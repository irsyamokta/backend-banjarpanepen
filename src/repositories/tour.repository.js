import prisma from "../config/db.js";

export const getTours = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [tours, total] = await Promise.all([
        prisma.tour.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.tour.count(),
    ]);

    return {
        data: tours,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    };
};

export const getTourById = async (id) => prisma.tour.findUnique({ where: { id } });

export const createTour = async (data) => prisma.tour.create({ data });

export const updateTour = async (id, data) => prisma.tour.update({ where: { id }, data }); 

export const deleteTour = async (id) => prisma.tour.delete({ where: { id } });