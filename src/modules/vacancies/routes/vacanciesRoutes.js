const express = require('express');
const vacanciesController = require('../controllers/vacanciesController');

const router = express.Router();

router.get('/vacancies-welcome', (req, res) => {
  return res.status(200).json({ messagem: 'Welcome!' });
});

router.get('/vacancies', vacanciesController.listVacancies);
router.get('/vacancies/:id', vacanciesController.getVacancyDetails);

module.exports = router;

