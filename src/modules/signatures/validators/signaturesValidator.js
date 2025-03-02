const Joi = require('joi');
const errorMessagePackage = require('./errorMessagePackage');

const packageValidation = Joi.objet({
  name: Joi.string().min(3).max(100).required().messages({
    'any.required': errorMessagePackage().name.required,
    'string.empty': errorMessagePackage().name.empty,
    'string.min': errorMessagePackage().name.min,
    'string.max': errorMessagePackage().name.max,
  }),
  vacancy_limit: Joi.number().integer().required().messages({
    'any.required': errorMessagePackage().vacancy_limit.required,
    'number.base': errorMessagePackage().vacancy_limit.invalid,
  }),
  price: Joi.number().required().messages({
    'any.required': errorMessagePackage().price.required,
    'number.base': errorMessagePackage().price.invalid,
  }),
  periodicity: Joi.string().required().valid('daily', 'weekly','monthly').messages({
    'any.required': errorMessagePackage().periodicity.required,
    'string.empty': errorMessagePackage().periodicity.empty,
    'string.valid': errorMessagePackage().periodicity.invalid,
  }),
  featured: Joi.boolean().required().messages({
    'any.required': errorMessagePackage().featured.required,
    'boolean.base': errorMessagePackage().featured.invalid,
  }),
});

module.exports = packageValidation;