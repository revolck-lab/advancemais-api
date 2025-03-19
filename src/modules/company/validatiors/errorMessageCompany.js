const messageErrorCompany = () => ({
  cnpj: {
    empty: "The CNPJ cannot be empty.",
    length: "The CNPJ must have exactly 14 digits.",
    invalid: "The CNPJ must contain only numbers.",
    required: "The CNPJ is required.",
  },
  trade_name: {
    empty: "The trade name cannot be empty.",
    max: (max) => `The trade name must have a maximum of ${max} characters.`,
    required: "The trade name is required.",
  },
  business_name: {
    empty: "The business name cannot be empty.",
    max: (max) => `The business name must have a maximum of ${max} characters.`,
    required: "The business name is required.",
  },
  contact_name: {
    empty: "The contact name cannot be empty.",
    max: (max) => `The contact name must have a maximum of ${max} characters.`,
    required: "The contact name is required.",
  },
  address_id: {
    invalid: "The address ID must be a valid number.",
    required: "The address ID is required.",
  },
  whatsapp: {
    empty: "The WhatsApp number cannot be empty.",
    length: "The WhatsApp number must have exactly 11 digits.",
    invalid: "The WhatsApp number must contain only numbers.",
    required: "The WhatsApp number is required.",
  },
  mobile_phone: {
    empty: "The mobile phone number cannot be empty.",
    length: "The mobile phone number must have exactly 11 digits.",
    invalid: "The mobile phone number must contain only numbers.",
    required: "The mobile phone number is required.",
  },
  landline_phone: {
    length: "The landline phone number must have exactly 11 digits.",
    invalid: "The landline phone number must contain only numbers.",
  },
  email: {
    empty: "The email cannot be empty.",
    invalid: "The email must be a valid email address.",
    max: (max) => `The email must have a maximum of ${max} characters.`,
    required: "The email is required.",
  },
  password: {
    empty: "The password cannot be empty.",
    min: (min) => `The password must have at least ${min} characters.`,
    max: (max) => `The password must have a maximum of ${max} characters.`,
    required: "The password is required.",
  },
  status: {
    invalid: "The status must be a boolean value.",
  },
  role_id: {
    invalid: "The role ID must be a valid number.",
    required: "The role ID is required.",
  },
});

module.exports = messageErrorCompany;
