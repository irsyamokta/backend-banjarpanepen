import Joi from "joi";

export const updateUserValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .empty("")
            .required()
            .messages({
                "string.min": "Nama minimal harus 3 karakter!",
                "string.max": "Nama maksimal 50 karakter!",
                "any.required": "Nama tidak boleh kosong!"
            }),

        phone: Joi.string()
            .min(10)
            .max(15)
            .regex(/^[0-9]+$/)
            .empty("")
            .required()
            .messages({
                "string.min": "Nomor telepon minimal harus 10 karakter!",
                "string.max": "Nomor telepon maksimal 15 karakter!",
                "any.required": "Nomor telepon tidak boleh kosong!"
            }),

        email: Joi.string()
            .email()
            .empty("")
            .required()
            .messages({
                "string.email": "Format email tidak valid!",
                "any.required": "Email tidak boleh kosong!"
            }),

        instagram: Joi.string()
            .empty("")
            .required()
            .messages({
                "any.required": "Instagram tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};