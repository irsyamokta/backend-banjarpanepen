import Joi from "joi";

export const tourValidator = (data) => {
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

        about: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Tentang minimal harus 3 karakter!",
                "any.required": "Tentang tidak boleh kosong!"
            }),

        operational: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Operasional minimal harus 3 karakter!",
                "any.required": "Operasional tidak boleh kosong!"
            }),

        start: Joi.string()
            .pattern(timePattern)
            .required()
            .messages({
                "string.pattern.base": "Format jam mulai harus HH:mm (contoh: 08:00)",
                "any.required": "Jam mulai tidak boleh kosong!"
            }),

        end: Joi.string()
            .pattern(timePattern)
            .required()
            .messages({
                "string.pattern.base": "Format jam selesai harus HH:mm (contoh: 17:00)",
                "any.required": "Jam selesai tidak boleh kosong!"
            }),

        facility: Joi.string()
            .required()
            .messages({
                "any.required": "Fasilitas tidak boleh kosong!"
            }),

        maps: Joi.string()
            .optional(),
        
        price: Joi.number()
            .min(10000)
            .messages({
                "number.min": "Harga minimal adalah 10000!",
                "any.required": "Harga tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};