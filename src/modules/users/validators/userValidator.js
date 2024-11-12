const Joi = require('joi');
const messageErrorUser = require('./function_errorMessageUser');

const userValidation = Joi.object({
    full_name: Joi.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .max(255)
        .min(1)
        .required()
        .messages({
            'string.pattern.base': messageErrorUser('full_name').nameFormat,
            'string.empty': messageErrorUser('full_name').empty,
            'string.max': messageErrorUser('full_name').max(255),
            'string.min': messageErrorUser('full_name').min(1),
            'any.required': messageErrorUser('full_name').required,
        }),
    cpf: Joi.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.empty': messageErrorUser('CPF').empty,
            'string.length': messageErrorUser('CPF').min(11),
            'string.pattern.base': messageErrorUser('CPF').number,
            'any.required': messageErrorUser('CPF').required,
        }),
    password: Joi.string()
        .max(255)
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .required()
        .messages({
            'string.pattern.base': messageErrorUser('password').passwordMin,
            'string.min': messageErrorUser('password').min(8),
            'string.max': messageErrorUser('password').max(255),
            'string.empty': messageErrorUser('password').empty,
            'any.required': messageErrorUser('password').required,
        }),
    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': messageErrorUser('email').email,
            'string.empty': messageErrorUser('email').empty,
            'string.max': messageErrorUser('email').max(255),
            'any.required': messageErrorUser('email').required,
        }),
});

module.exports = userValidation;
