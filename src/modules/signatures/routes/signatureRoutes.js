const express = require('express');
const signaturePackageController = require('../controllers/signatureController');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');
const authToken = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', signaturePackageController.getAllPackages);
router.get('/:id', signaturePackageController.getPackageDetails);
router.post('/', authToken, authorization.accessLevel(4), signaturePackageController.createPackage);
router.put('/:id', authToken, authorization.accessLevel(4), signaturePackageController.updatePackage);
router.delete('/:id', authToken, authorization.accessLevel(4), signaturePackageController.deletePackage);

module.exports = router;