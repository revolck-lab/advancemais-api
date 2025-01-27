const express = require('express');
const vacanciesController = require('../controllers/vacanciesController');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');

const router = express.Router();

router.get('/vacancy-welcome', (req, res) => {
  return res.status(200).json({ messagem: 'Welcome!' });
});

router.get('/', authorization.accessLevel(1, 2), vacanciesController.listVacancies);
router.get('/:id', authorization.accessLevel(1, 2),vacanciesController.getVacancyDetails);

module.exports = router;

