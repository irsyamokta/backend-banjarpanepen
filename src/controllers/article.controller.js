import * as articleService from "../services/article.service.js";

export const getArticles = async (req, res, next) => {
    try {
        const articles = await articleService.getArticles();
        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
};

export const getArticleById = async (req, res, next) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

export const createArticle = async (req, res, next) => {
    try {
        const article = await articleService.createArticle(req.body, req.file);
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
};

export const updateArticle = async (req, res, next) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body, req.file);
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

export const deleteArticle = async (req, res, next) => {
    try {
        const article = await articleService.deleteArticle(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};