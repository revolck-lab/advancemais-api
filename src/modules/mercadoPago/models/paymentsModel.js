const { knexInstance } = require('../../../config/db');

const paymentsModel = {
  createPayment: async (payment) => {
    const db = await knexInstance();
    const [id] = await db('company_payments').insert(payment);
    return id;
  },

  updatePayment: async (mpPreferenceId, status) => {
    const db = await knexInstance();
    return db('company_payments')
      .where({ mp_preference_id: mpPreferenceId })
      .update({ status });
  },

  getPaymentById: async (id) => {
    const db = await knexInstance();
    return db('company_payments').where({ id }).first();
  },
};

module.exports = paymentsModel;
