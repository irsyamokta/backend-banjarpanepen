import Joi from "joi";

export const settingValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.min": "Judul minimal harus 3 karakter!",
                "string.max": "Judul maksimal 100 karakter!",
                "any.required": "Judul tidak boleh kosong!"
            }),

        category: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.min": "Caption minimal harus 3 karakter!",
                "any.required": "Caption tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
}