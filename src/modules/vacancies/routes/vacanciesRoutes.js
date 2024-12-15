const express = require('express');
const router = express.Router();
const vacanciesController = require('../controllers/vacanciesController');

router.get('/vacancies-welcome', (req, res) => {
  return res.status(200).json({ messagem: 'Welcome!' });
});

router.get('/vacancies', vacanciesController.listVacancies);
router.get('/vacancies/:id', vacanciesController.getVacancyDetails);

module.exports = router;

