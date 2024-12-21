const express = require('express');
const bannerController = require('../controllers/bannerController');

const router = express.Router();

router.get('/banner', bannerController.listBanners);
router.post('/banner', bannerController.addBanner);
router.put('/banner/:id', bannerController.editBanner);
router.delete('/banner/:id', bannerController.removeBanner);

module.exports = router;
