const errorMessagesSubscription = {
  company_id: {
    required: 'The "company_id" field is required',
    invalid: 'The "company_id" field must be a valid integer',
  },
  package_id: {
    required: 'The "package_id" field is required',
    invalid: 'The "package_id" field must be a valid integer',
  },
  start_date: {
    required: 'The "start_date" field is required',
    invalid: 'The "start_date" field must be a valid date in YYYY-MM-DD format',
  },
  end_date: {
    invalid: 'The "end_date" field must be a valid date in YYYY-MM-DD format',
  },
  status: {
    required: 'The "status" field is required',
    invalid: 'The "status" field must be one of the following: active, canceled, expired',
  },
};

module.exports = errorMessagesSubscription;
