const express = require('express');
const authToken = require('../../../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');

const router = express.Router();

router.get('/auth/welcome', (req, res) => {
    res.status(200).json({ message: 'Welcome!!' });
});

router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);

router.get('/auth/permission/student', authToken, authorization.admin, (req, res) => {
    res.json({ message: 'Access granted: Student' });
});

router.get('/auth/permission/teacher', authToken, authorization.admin, (req, res) => {
    res.json({ message: 'Access granted: Teacher' });
});

router.get('/auth/permission/company', authToken, authorization.admin, (req, res) => {
    res.json({ message: 'Access granted: Company' });
});

router.get('/auth/permission/admin', authToken, authorization.accessLevel(4), (req, res) => {
    res.json({ message: 'Access granted: Admin' });
});


module.exports = router;