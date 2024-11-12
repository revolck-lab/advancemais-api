const express = require('express');
const authToken = require('../../../middlewares/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/auth/welcome', (req, res) => {
    res.status(200).json({ message: 'Welcome!!' })
});

router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);

module.exports = router;