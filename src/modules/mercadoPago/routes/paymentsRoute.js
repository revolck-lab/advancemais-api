const express = require('express');
const authToken = require('../../../middlewares/authMiddleware');
const { createPayment, webhookHandler } = require('../controllers/paymentsController');

const router = express.Router();

router.post('/checkout', authToken, createPayment);
router.post('/checkout/webhook', authToken, webhookHandler);

module.exports = router;
