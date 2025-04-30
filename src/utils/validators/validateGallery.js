import Joi from "joi";

export const galleryValidator = (data) => {
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

        caption: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Caption minimal harus 3 karakter!",
                "any.required": "Caption tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
}