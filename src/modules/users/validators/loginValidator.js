const Joi = require('joi');
const messageErrorLogin = require('./function_errorMessageLogin');

const loginValidation = Joi.object({
    login: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.empty': messageErrorLogin().login.empty,
            'string.max': messageErrorLogin().login.max(255),
            'any.required': messageErrorLogin().login.required,
            'any.invalid': messageErrorLogin().login.invalid,
        }),
    password: Joi.string()
        .max(255)
        .min(8)
        .required()
        .messages({
            'string.empty': messageErrorLogin().password.empty,
            'string.min': messageErrorLogin().password.min(8),
            'string.max': messageErrorLogin().password.max(255),
            'any.required': messageErrorLogin().password.required,
            'string.pattern.base': messageErrorLogin().password.pattern,
        }),
});

module.exports = loginValidation;