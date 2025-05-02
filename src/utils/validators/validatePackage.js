import Joi from "joi";

export const packageValidator = (data) => {
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

        price: Joi.number()
            .min(10000)
            .messages({
                "number.min": "Harga minimal adalah 10000!",
                "any.required": "Harga tidak boleh kosong!"
            }),

        benefit: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Benefit minimal harus 3 karakter!",
                "any.required": "Benefit tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};