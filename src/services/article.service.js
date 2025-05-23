import * as articleRepository from "../repositories/article.repository.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js"; 
import { articleValidator } from "../utils/validators/index.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";

export const getArticles = async (page, limit) => {
    const articles = await articleRepository.getArticles(page, limit);
    return articles;
};

export const getArticleById = async (id) => {
    const article = await articleRepository.getArticleById(id);
    if (!article) throw new NotFoundError("Artikel tidak ditemukan");
    return article;
};

export const createArticle = async (userId, data, file) => {
    const { error } = articleValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, content, writer } = data;
    const { fileUrl, publicId } = await uploadImage(file, "article");


    const dataArticle = {
        title,
        content,
        writer,
        editorId: userId,
        thumbnail: fileUrl,
        publicId: publicId
    };

    const createArticle = await articleRepository.createArticle(dataArticle);
    return createArticle;
};

export const updateArticle = async (id, data, file) => {

    const article = await articleRepository.getArticleById(id);
    if (!article) throw new NotFoundError("Artikel tidak ditemukan");

    const { error } = articleValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { title, content, writer } = data;
    let thumbnail = article.thumbnail;
    let publicId = article.publicId;

    if (file) {
        if (publicId) {
            await deleteImageFromCloudinary(publicId);
        }
        const uploadResult = await uploadImage(file, "article");
        thumbnail = uploadResult.fileUrl;
        publicId = uploadResult.publicId;
    }

    const dataArticle = {
        title,
        content,
        writer,
        thumbnail: thumbnail,
        publicId: publicId
    };

    const updateArticle = await articleRepository.updateArticle(id, dataArticle);
    return updateArticle;
};

export const deleteArticle = async (id) => {
    const article = await articleRepository.getArticleById(id);
    if (!article) throw new NotFoundError("Artikel tidak ditemukan");

    if (article.publicId) {
        await deleteImageFromCloudinary(article.publicId);
    }

    await articleRepository.deleteArticle(id);
    return { message: "Artikel berhasil dihapus" };
};