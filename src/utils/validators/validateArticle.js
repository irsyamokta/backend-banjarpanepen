import Joi from "joi";

export const articleValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.min": "Judul minimal harus 3 karakter!",
                "string.max": "Judul maksimal 100 karakter!",
                "any.required": "Judul tidak boleh kosong!"
            }),

        content: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Konten minimal harus 3 karakter!",
                "any.required": "Konten tidak boleh kosong!"
            }),

        writer: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Penulis minimal harus 3 karakter!",
                "any.required": "Penulis tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};