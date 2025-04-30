import prisma from "../config/db.js";

export const getArticles = async () => {
    return await prisma.article.findMany({
        include: {
            editor: {
                select: {
                    name: true,
                }
            }
        }
    });
};

export const getArticleById = async (id) => prisma.article.findUnique({ where: { id } });

export const createArticle = async (userId, data, file) => {
    return prisma.article.create(
        {
            data:
            {
                title: data.title,
                content: data.content,
                writer: data.writer,
                editorId: userId,
                thumbnail: file
            }
        });
};

export const updateArticle = async (id, data, file) => {
    return prisma.article.update({
        where: { id },
        data: {
            title: data.title,
            content: data.content,
            writer: data.writer,
            thumbnail: file
        }
    });
};

export const deleteArticle = async (id) => prisma.article.delete({ where: { id } });