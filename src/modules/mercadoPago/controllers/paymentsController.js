const mercadopago = require('../../../services/mercadoPagoService');
const paymentsModel = require('../models/paymentsModel');
const paymentsService = require('../services/paymentsService');

const paymentsController = () => {
  createPayment = async (req, res) => {
    try {
      const payment = await paymentsService.createPayment(req.body);
      return res.json(payment);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  getAllPayments = async (req, res) => {
    try {
      const payments = await paymentsService.getAllPayments();
      return res.json(payments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getPaymentByCompany = async (req, res) => {
    try {
      const { company_id } = req.params;
      const payments = await paymentsService.getPaymentByCompany(company_id);
      return res.json(payments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

const webhookHandler = async (req, res) => {
  try {
    const { id, topic } = req.body;
    if (topic !== 'payment') {
      return res.status(400).json({ error: 'Evento não suportado' });
    }

    const payment = await mercadopago.payment.findById(id);
    const status = payment.body.status.toUpperCase();

    await paymentsService.updatePaymentStatus(id, status);

    const preferenceId = payment.body.preference_id;
    if (preferenceId) {
      const dbPayment = await paymentsModel.getPaymentByPreferenceId(preferenceId);
      if (dbPayment && !dbPayment.payment_id) {
        await paymentsModel.updatePaymentByPreferenceId(preferenceId, { payment_id: id });
      }
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Erro ao processar webhook' });
  }
};

module.exports = { paymentsController, webhookHandler };