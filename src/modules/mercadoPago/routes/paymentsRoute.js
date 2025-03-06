const express = require('express');
const authToken = require('../../../middlewares/authMiddleware');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');
const { validatePayment } = require('../validators/paymentValidator');
const { createPayment, webhookHandler } = require('../controllers/paymentsController');

const router = express.Router();

router.post('/checkout', authToken, authorization.accessLevel(3), validatePayment, createPayment);

router.post('/checkout/webhook', (req, res, next) => {
  const secret = req.query.secret || req.body.secret;
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(403).json({ error: 'Invalid webhook secret' });
  }
  next();
}, webhookHandler);

module.exports = router;