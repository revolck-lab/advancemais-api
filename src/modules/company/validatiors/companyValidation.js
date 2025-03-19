const Joi = require("joi");
const messageErrorCompany = require("./errorMessageCompany");

const companyValidation = Joi.object({
  cnpj: Joi.string()
    .length(14)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": messageErrorCompany().cnpj.empty,
      "string.length": messageErrorCompany().cnpj.length,
      "string.pattern.base": messageErrorCompany().cnpj.invalid,
      "any.required": messageErrorCompany().cnpj.required,
    }),
  trade_name: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.empty": messageErrorCompany().trade_name.empty,
      "string.max": messageErrorCompany().trade_name.max(255),
      "any.required": messageErrorCompany().trade_name.required,
    }),
  business_name: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.empty": messageErrorCompany().business_name.empty,
      "string.max": messageErrorCompany().business_name.max(255),
      "any.required": messageErrorCompany().business_name.required,
    }),
  contact_name: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.empty": messageErrorCompany().contact_name.empty,
      "string.max": messageErrorCompany().contact_name.max(255),
      "any.required": messageErrorCompany().contact_name.required,
    }),
  address_id: Joi.number().integer().positive().required().messages({
    "number.base": messageErrorCompany().address_id.invalid,
    "any.required": messageErrorCompany().address_id.required,
  }),
  whatsapp: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": messageErrorCompany().whatsapp.empty,
      "string.length": messageErrorCompany().whatsapp.length,
      "string.pattern.base": messageErrorCompany().whatsapp.invalid,
      "any.required": messageErrorCompany().whatsapp.required,
    }),
  mobile_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": messageErrorCompany().mobile_phone.empty,
      "string.length": messageErrorCompany().mobile_phone.length,
      "string.pattern.base": messageErrorCompany().mobile_phone.invalid,
      "any.required": messageErrorCompany().mobile_phone.required,
    }),
  landline_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .allow(null, "")
    .messages({
      "string.length": messageErrorCompany().landline_phone.length,
      "string.pattern.base": messageErrorCompany().landline_phone.invalid,
    }),
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      "string.empty": messageErrorCompany().email.empty,
      "string.email": messageErrorCompany().email.invalid,
      "string.max": messageErrorCompany().email.max(255),
      "any.required": messageErrorCompany().email.required,
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      "string.empty": messageErrorCompany().password.empty,
      "string.min": messageErrorCompany().password.min(6),
      "string.max": messageErrorCompany().password.max(255),
      "any.required": messageErrorCompany().password.required,
    }),
  status: Joi.boolean().default(true).messages({
    "boolean.base": messageErrorCompany().status.invalid,
  }),
  role_id: Joi.number().integer().positive().required().messages({
    "number.base": messageErrorCompany().role_id.invalid,
    "any.required": messageErrorCompany().role_id.required,
  }),
});

module.exports = companyValidation;