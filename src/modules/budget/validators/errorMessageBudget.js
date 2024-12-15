const errorMessages = {
  type: {
    required: 'The "type" field is required',
    empty: 'The "type" field cannot be empty',
    only: 'The "type" must be either "recruitment" or "training"',
  },
  name: {
    required: 'The "name" field is required',
    empty: 'The "name" field cannot be empty',
    min: 'The "name" field must have at least 3 characters',
    max: 'The "name" field must have less than 100 characters',
  },
  surname: {
    required: 'The "surname" field is required',
    empty: 'The "surname" field cannot be empty',
    min: 'The "surname" field must have at least 3 characters',
    max: 'The "surname" field must have less than 100 characters',
  },
  company_name: {
    required: 'The "company_name" field is required',
    empty: 'The "company_name" field cannot be empty',
    min: 'The "company_name" field must have at least 2 characters',
    max: 'The "company_name" field must have less than 100 characters',
  },
  position: {
    required: 'The "position" field is required',
    empty: 'The "position" field cannot be empty',
    min: 'The "position" field must have at least 2 characters',
    max: 'The "position" field must have less than 100 characters',
  },
  email: {
    required: 'The "email" field is required',
    invalid: 'The "email" field must be a valid email address',
  },
  address: {
    max: 'The "address" field must have less than 255 characters',
  },
  state: {
    required: 'The "state" field is required',
  },
  phone: {
    required: 'The "phone" field is required',
    invalid: 'The "phone" field must be a valid phone number',
  },
  city: {
    required: 'The "city" field is required',
  },
  zip_code: {
    invalid:
      'The "zip_code" field must be a valid zip code format (e.g., 12345-678)',
  },
};

module.exports = errorMessages;
