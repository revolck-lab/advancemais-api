const mercadopago = require('../../../services/mercadoPagoService');
const paymentsModel = require('../models/paymentsModel');
const paymentValidation = require('../validators/paymentValidator');
const { createPaymentService, getAllPaymentsService, getPaymentByCompanyService, updatePaymentStatusService } = require('../services/paymentsService');

const createPaymentHandler = async (req, res) => {
  try {
    const { error } = paymentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { company_id, package_id } = req.body;
    const payment = await createPaymentService({ company_id, package_id });
    if (!payment) {
      return res.status(400).json({ error: 'Failed to create payment' });
    }

    return res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllPaymentsHandler = async (req, res) => {
  try {
    const payments = await getAllPaymentsService();
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getPaymentByCompanyHandler = async (req, res) => {
  try {
    const { company_id } = req.params;
    const payments = await getPaymentByCompanyService(company_id);
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const webhookHandler = async (req, res) => {
  try {
    const { id, topic } = req.body;
    if (topic !== 'payment') {
      return res.status(400).json({ error: 'Event not supported' });
    }

    const payment = await mercadopago.payment.findById(id);
    const status = payment.body.status.toUpperCase();

    const dbPayment = await paymentsModel.getPaymentById(id);
    if (dbPayment && dbPayment.status === status) {
      return res.sendStatus(200);
    }

    await updatePaymentStatusService(id, status);

    const preferenceId = payment.body.preference_id;
    if (preferenceId) {
      const dbPayment = await paymentsModel.getPaymentByPreferenceId(preferenceId);
      if (dbPayment && !dbPayment.payment_id) {
        await paymentsModel.updatePaymentByPreferenceIdModel(preferenceId, { payment_id: id });
      }
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Error processing webhook' });
  }
};

module.exports = {
  createPaymentHandler,
  getAllPaymentsHandler,
  getPaymentByCompanyHandler,
  webhookHandler,
};