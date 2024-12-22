const express = require('express');
const vacanciesController = require('../controllers/vacanciesController');

const router = express.Router();

router.get('/vacancy-welcome', (req, res) => {
  return res.status(200).json({ messagem: 'Welcome!' });
});

router.get('/vacancy', vacanciesController.listVacancies);
router.get('/vacancy/:id', vacanciesController.getVacancyDetails);

module.exports = router;

