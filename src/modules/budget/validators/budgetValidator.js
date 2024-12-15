const Joi = require("joi");
const errorMessages = require("../utils/errorMessageBudget");

const budgetSchema = Joi.object({
  type: Joi.string().valid("recruitment", "training").required().messages({
    "any.required": errorMessages.type.required,
    "string.empty": errorMessages.type.empty,
    "any.only": errorMessages.type.only,
  }),

  name: Joi.string().min(3).max(100).required().messages({
    "any.required": errorMessages.name.required,
    "string.empty": errorMessages.name.empty,
    "string.min": errorMessages.name.min,
    "string.max": errorMessages.name.max,
  }),

  surname: Joi.string().min(3).max(100).required().messages({
    "any.required": errorMessages.surname.required,
    "string.empty": errorMessages.surname.empty,
    "string.min": errorMessages.surname.min,
    "string.max": errorMessages.surname.max,
  }),

  company_name: Joi.string().min(2).max(100).required().messages({
    "any.required": errorMessages.company_name.required,
    "string.empty": errorMessages.company_name.empty,
    "string.min": errorMessages.company_name.min,
    "string.max": errorMessages.company_name.max,
  }),

  position: Joi.string().min(2).max(100).required().messages({
    "any.required": errorMessages.position.required,
    "string.empty": errorMessages.position.empty,
    "string.min": errorMessages.position.min,
    "string.max": errorMessages.position.max,
  }),

  email: Joi.string().email().required().messages({
    "any.required": errorMessages.email.required,
    "string.email": errorMessages.email.invalid,
  }),

  address: Joi.string().optional().max(255).messages({
    "string.max": errorMessages.address.max,
  }),

  state: Joi.string().required().messages({
    "any.required": errorMessages.state.required,
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "any.required": errorMessages.phone.required,
      "string.pattern.base": errorMessages.phone.invalid,
    }),

  city: Joi.string().required().messages({
    "any.required": errorMessages.city.required,
  }),

  zip_code: Joi.string()
    .pattern(/^\d{5}-?\d{3}$/)
    .optional()
    .messages({
      "string.pattern.base": errorMessages.zip_code.invalid,
    }),
});

module.exports = budgetSchema;
