const express = require('express');
const carouselCompanyController = require('../controllers/carousel_companyController');

const router = express.Router();

router.get('/carouselCompany', carouselCompanyController.getAllCarouselCompany);
router.post('/carouselCompany', carouselCompanyController.createCarouselCompany);
router.put('/carouselCompany/:id', carouselCompanyController.updateCarouselCompany);
router.delete('/carouselCompany/:id', carouselCompanyController.deleteCarouselCompany);
router.get('/carouselCompany/:id', carouselCompanyController.findByIdCompany);

module.exports = router;
