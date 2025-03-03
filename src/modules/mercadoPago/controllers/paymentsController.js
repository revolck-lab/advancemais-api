const paymentsService = require('../services/paymentsService');

// 🔹 Controller para criar um pagamento
const createPayment = async (req, res) => {
  try {
    const payment = await paymentsService.createPayment(req.body);
    return res.json(payment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 🔹 Controller para processar o Webhook do Mercado Pago
const webhookHandler = async (req, res) => {
  try {
    const { id, topic } = req.body;

    if (topic !== 'payment') {
      return res.status(400).json({ error: 'Evento não suportado' });
    }

    // Buscar detalhes do pagamento no Mercado Pago
    const payment = await mercadopago.payment.findById(id);
    const status = payment.body.status.toUpperCase();

    await paymentsService.updatePaymentStatus(id, status);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao processar webhook' });
  }
};

module.exports = { createPayment, webhookHandler };
