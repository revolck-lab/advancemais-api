const express = require('express');
const recoveryController = require('../controllers/passwordRecoveryController');

const router = express.Router();

router.post('/recovery-password', recoveryController.requestPasswordRecovery);
router.post('/reset-password', recoveryController.resetPassword);

module.exports = router;