const mercadopago = require('../../../config/mercadoPago');
const paymentsModel = require('../models/paymentsModel');
const Joi = require('joi');

// 🔹 Criar um pagamento com Mercado Pago
const createPayment = async (data) => {
  // Validação dos dados de entrada
  const { error, value } = paymentSchema.validate(data);
  if (error) throw new Error(error.details[0].message);

  const { companyId, packageId } = value;

  // Criar preferência de pagamento no Mercado Pago
  const preference = {
    items: [
      {
        title: `Pacote ID: ${packageId}`,
        quantity: 1,
        unit_price: 100.00, // Aqui, busque o valor real do pacote no banco!
        currency_id: 'BRL',
      },
    ],
    payer: {
      email: 'cliente@example.com', // Buscar do banco, baseado no companyId
    },
    back_urls: {
      success: 'https://seusite.com/sucesso',
      failure: 'https://seusite.com/falha',
      pending: 'https://seusite.com/pendente',
    },
    auto_return: 'approved',
    notification_url: `${process.env.BASE_URL}/api/checkout/webhook`,
  };

  const response = await mercadopago.preferences.create(preference);

  // Salvar os dados da transação no banco
  const paymentData = {
    company_id: companyId,
    package_id: packageId,
    mp_preference_id: response.body.id,
    status: 'PENDING',
  };

  const paymentId = await paymentsModel.createPayment(paymentData);

  return { init_point: response.body.init_point, paymentId };
};

// 🔹 Atualizar status de pagamento via Webhook
const updatePaymentStatus = async (mpPreferenceId, status) => {
  return paymentsModel.updatePayment(mpPreferenceId, status);
};

module.exports = { createPayment, updatePaymentStatus };
