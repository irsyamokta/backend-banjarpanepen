import Joi from "joi";

export const eventValidator = (data) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

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
            .pattern(timePattern)
            .required()
            .messages({
                "string.pattern.base": "Format jam mulai harus HH:mm (contoh: 08:00)",
                "any.required": "Jam mulai tidak boleh kosong!"
            }),

        place: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Tempat minimal harus 3 karakter!",
                "any.required": "Tempat tidak boleh kosong!"
            }),

        price: Joi.number()
            .min(0)
            .optional()
            .messages({
                "number.min": "Harga minimal adalah 0!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};