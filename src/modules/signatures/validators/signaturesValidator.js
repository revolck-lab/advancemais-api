const Joi = require('joi');
const errorMessagePackage = require('./errorMessagePackage');
const errorMessageSubscription = require('./errorMessageSubscription');

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

const subscriptionValidation = Joi.object({
  company_id: Joi.number().integer().required().messages({
    'any.required': errorMessageSubscription().company_id.required,
    'number.base': errorMessageSubscription().company_id.invalid,
  }),
  package_id: Joi.number().integer().required().messages({
    'any.required': errorMessageSubscription().package_id.required,
    'number.base': errorMessageSubscription().package_id.invalid,
  }),
  start_date: Joi.date().required().format('YYYY-MM-DD').messages({
    'any.required': errorMessageSubscription().start_date.required,
    'date.format': errorMessageSubscription().start_date.invalid,
  }),
  end_date: Joi.date().required().format('YYYY-MM-DD').greater(Joi.ref('start_date')).messages({
    'any.required': errorMessageSubscription().end_date.required,
    'date.format': errorMessageSubscription().end_date.invalid,
    'date.greater': errorMessageSubscription().end_date.greater,
  }),
  status: Joi.string().required().valid('active', 'canceled', 'expired').messages({
    'any.required': errorMessageSubscription().status.required,
    'string.empty': errorMessageSubscription().status.empty,
    'string.valid': errorMessageSubscription().status.invalid,
  }),
});

module.exports = { 
  packageValidation,
  subscriptionValidation
}