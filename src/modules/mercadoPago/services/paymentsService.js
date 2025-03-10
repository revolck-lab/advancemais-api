const mercadopago = require('../../../services/mercadoPagoService');
const paymentsModel = require('../models/paymentsModel');
const { knexInstance } = require('../../../config/db');

const createPaymentService = async ({ company_id, package_id }) => {
  const db = await knexInstance();
  const company = await db('company').where({ id: company_id }).first();
  const package = await db('signatures_packages').where({ id: package_id }).first();

  if (!company || !package) {
    throw new Error('Empresa ou pacote não encontrado');
  }

  // Verifica se a BASE_URL está definida corretamente
  if (!process.env.FRONTEND_URL || !process.env.MP_ACCESS_TOKEN) {
    throw new Error("A variável de ambiente BASE_URL ou WEBHOOK_SECRET não está definida!");
  }

  const notificationUrl = `${process.env.FRONTEND_URL}/api/checkout/webhook?secret=${process.env.MP_ACCESS_TOKEN}`;

  // Valida se a URL é realmente válida antes de enviar
  try {
    new URL(notificationUrl);
  } catch (error) {
    throw new Error(`URL inválida: ${notificationUrl}`);
  }

  const paymentData = {
    body: {
      transaction_amount: parseFloat(package.price),
      description: `Pacote ID: ${package_id}`,
      payment_method_id: "pix",
      payer: {
        email: company.email,
      },
      notification_url: notificationUrl, // URL validada
    }
  };

  const response = await mercadopago.createPayment(paymentData);

  const paymentDataToSave = {
    company_id,
    package_id,
    mp_preference_id: response.body.id,
    status: 'PENDING',
    payment_id: response.body.id,
  };

  const payment = await paymentsModel.createPayment(paymentDataToSave);
  return { 
    qr_code_base64: response.body.point_of_interaction.transaction_data.qr_code_base64,
    ticket_url: response.body.point_of_interaction.transaction_data.ticket_url,
    paymentId: payment.id 
  };
};


const updatePaymentStatusService = async (paymentId, status) => {
  const payment = await paymentsModel.getPaymentByPaymentId(paymentId);
  if (!payment) {
    const db = await knexInstance();
    await db('company_payments').insert({ payment_id: paymentId, status });
    return;
  }
  return paymentsModel.updatePaymentByPaymentId(paymentId, status);
};

const getAllPaymentsService = async () => {
  return paymentsModel.getAllPaymentsModel();
};

const getPaymentByCompanyService = async (company_id) => {
  return paymentsModel.getPaymentByCompanyModel(company_id);
};

module.exports = {
  createPaymentService,
  updatePaymentStatusService,
  getAllPaymentsService,
  getPaymentByCompanyService,
};
