import prisma from "../config/db.js";

export const getArticles = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                editor: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
        prisma.article.count(),
    ]);

    return {
        data: articles,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    };
};

export const getArticleById = async (id) => prisma.article.findUnique({ where: { id } });

export const createArticle = async (data) => prisma.article.create({ data });

export const updateArticle = async (id, data) => prisma.article.update({ where: { id }, data });

export const deleteArticle = async (id) => prisma.article.delete({ where: { id } });