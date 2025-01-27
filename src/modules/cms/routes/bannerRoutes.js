const express = require('express');
const bannerController = require('../controllers/bannerController');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');

const router = express.Router();

router.get('/', authorization.accessLevel(4), bannerController.listBanners);
router.post('/', authorization.accessLevel(4), bannerController.addBanner);
router.put('/:id', authorization.accessLevel(4), bannerController.editBanner);
router.delete('/:id', authorization.accessLevel(4), bannerController.removeBanner);

module.exports = router;
