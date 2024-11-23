const Joi = require('joi');
const messageErrorUser = require('./function_errorMessageUser');

const userValidation = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .max(255)
        .min(1)
        .required()
        .messages({
            'string.pattern.base': messageErrorUser().name.nameFormat,
            'string.empty': messageErrorUser().name.empty,
            'string.max': messageErrorUser().name.max(255),
            'string.min': messageErrorUser().name.min(1),
            'any.required': messageErrorUser().name.required,
        }),

    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': messageErrorUser().email.email,
            'string.empty': messageErrorUser().email.empty,
            'string.max': messageErrorUser().email.max(255),
            'any.required': messageErrorUser().email.required,
        }),

    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .max(255)
        .min(8)
        .required()
        .messages({
            'string.pattern.base': messageErrorUser().password.passwordMin,
            'string.min': messageErrorUser().password.min(8),
            'string.max': messageErrorUser().password.max(255),
            'string.empty': messageErrorUser().password.empty,
            'any.required': messageErrorUser().password.required,
        }),

    cpf: Joi.string()
        .length(11)
        .pattern(/^[0-9]{11}$/)
        .required()
        .messages({
            'string.empty': messageErrorUser().cpf.empty,
            'string.length': messageErrorUser().cpf.length(11),
            'string.pattern.base': messageErrorUser().cpf.number,
            'any.required': messageErrorUser().cpf.required,
        }),

    phone_user: Joi.string()
        .length(11)
        .pattern(/^[0-9]{11}$/)
        .required()
        .messages({
            'string.empty': messageErrorUser().phone_user.empty,
            'string.length': messageErrorUser().phone_user.length(11),
            'string.pattern.base': messageErrorUser().phone_user.number,
            'any.required': messageErrorUser().phone_user.required,
        }),

    gender_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': messageErrorUser().gender_id.number,
            'any.required': messageErrorUser().gender_id.required,
        }),

    education_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': messageErrorUser().education_id.number,
            'any.required': messageErrorUser().education_id.required,
        }),

    role_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': messageErrorUser().role_id.number,
            'any.required': messageErrorUser().role_id.required,
        }),

    address_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': messageErrorUser().address_id.number,
            'any.required': messageErrorUser().address_id.required,
        }),

    code_user: Joi.string()
        .required()
        .messages({
            'string.empty': messageErrorUser().code_user.required,
            'any.required': messageErrorUser().code_user.required,
        }),

    birth_date: Joi.date()
        .required()
        .messages({
            'date.base': messageErrorUser().birth_date.invalid,
            'any.required': messageErrorUser().birth_date.required,
        }),

    status: Joi.number()
        .valid(0, 1)
        .default(1)
        .messages({
            'any.only': "Status should be 0 or 1.",
        }),

});

module.exports = userValidation;
