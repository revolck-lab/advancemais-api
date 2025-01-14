const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

router.get('/carousel', carouselController.getAll);
router.get('/carousel/:id', carouselController.getById);
router.post('/carousel', carouselController.create);
router.put('/carousel/:id', carouselController.update);
router.delete('/carousel/:id', carouselController.delete);

module.exports = router;
