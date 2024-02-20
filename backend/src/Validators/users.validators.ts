import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone_number: joi.number().min(10).required(),
    password: joi.string().required(),
    role: joi.string().min(4).required(),
    profile_image: joi.string(),
    location: joi.string()
})