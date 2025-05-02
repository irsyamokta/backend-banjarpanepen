import Joi from "joi";

export const eventValidator = (data) => {
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

        description: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Deskripsi minimal harus 3 karakter!",
                "any.required": "Deskripsi tidak boleh kosong!"
            }),

        date: Joi.date()
            .iso()
            .min('now')
            .required()
            .messages({
                "date.format": "Tanggal harus dalam format YYYY-MM-DD!",
                "date.base": "Tanggal tidak valid!",
                "any.required": "Tanggal tidak boleh kosong!"
            }),

        time: Joi.string()
            .pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
            .required()
            .messages({
                "string.pattern.base": "Waktu harus dalam format HH:mm (24 jam)!",
                "any.required": "Waktu tidak boleh kosong!"
            }),

        place: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Tempat minimal harus 3 karakter!",
                "any.required": "Tempat tidak boleh kosong!"
            }),

        price: Joi.number()
            .min(10000)
            .optional()
            .messages({
                "number.min": "Harga minimal adalah 10000!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};