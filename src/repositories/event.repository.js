import prisma from "../config/db.js";

export const getEvents = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [events, total] = await Promise.all([
        prisma.event.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.event.count(),
    ]);

    return {
        data: events,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    };
};

export const getEventById = async (id) => prisma.event.findUnique({ where: { id } });

export const createEvent = async (data) => prisma.event.create({ data });

export const updateEvent = async (id, data) => prisma.event.update({ where: { id }, data });

export const deleteEvent = async (id) => prisma.event.delete({ where: { id } });