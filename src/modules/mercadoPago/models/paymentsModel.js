const { knexInstance } = require('../../../config/db');

const paymentsModel = {
  createPayment: async (payment) => {
    const db = await knexInstance();
    const [id] = await db('company_payments').insert(payment);
    return db('company_payments').where({ id }).first(); // Retorna o objeto completo
  },

  updatePaymentByPreferenceId: async (mpPreferenceId, status) => {
    const db = await knexInstance();
    return db('company_payments')
      .where({ mp_preference_id: mpPreferenceId })
      .update({ status });
  },

  updatePaymentByPaymentId: async (paymentId, status) => {
    const db = await knexInstance();
    return db('company_payments')
      .where({ payment_id: paymentId })
      .update({ status });
  },

  getPaymentById: async (id) => {
    const db = await knexInstance();
    return db('company_payments').where({ id }).first();
  },

  getPaymentByPreferenceId: async (mpPreferenceId) => {
    const db = await knexInstance();
    return db('company_payments').where({ mp_preference_id: mpPreferenceId }).first();
  },
};

module.exports = paymentsModel;