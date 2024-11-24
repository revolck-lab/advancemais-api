const Joi = require('joi');
const messageErrorLogin = require('./errorMessageLogin');

const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': messageErrorLogin().email.email,
            'string.empty': messageErrorLogin().email.empty,
            'string.max': messageErrorLogin().email.max(255),
            'any.required': messageErrorLogin().email.required,
            'any.invalid': messageErrorLogin().email.invalid,
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