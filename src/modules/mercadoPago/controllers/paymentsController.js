const paymentValidation = require('../validators/paymentValidator');
const { createPaymentService, getAllPaymentsService, getPaymentByCompanyService, updatePaymentStatusService } = require('../services/paymentsService');

const mercadopagoController = {
  createPaymentController: async (req, res) => {
    try {
      const { error } = paymentValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      console.log("Recebendo dados para pagamento:", req.body); // Apenas se for válido

      const payment = await createPaymentService(req.body);

      return res.status(201).json(payment);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      return res.status(500).json({ error: error.message || 'Failed to create payment' });
    }
  },
};


module.exports = mercadopagoController;