import prisma from "../config/db.js";

export const getArticles = async () => prisma.article.findMany();

export const getArticleById = async (id) => prisma.article.findUnique({ where: { id } });

export const createArticle = async (data, file) => {
    return prisma.article.create(
        {
            data:
            {
                title: data.title,
                content: data.content,
                writer: data.writer,
                editorId: data.userId,
                thumbnail: file
            }
        });
};

export const updateArticle = async (id, data, file) => prisma.article.update({ where: { id }, data, file });

export const deleteArticle = async (id) => prisma.article.delete({ where: { id } });