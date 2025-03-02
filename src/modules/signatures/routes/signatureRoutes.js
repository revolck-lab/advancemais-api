const express = require('express');
const signaturePackageController = require('../controllers/signatureController');
const authorization = require('../../../middlewares/middleware_roles/rolesMiddleware');
const authToken = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', signaturePackageController.getAllSignaturePackages);
router.get('/:id', signaturePackageController.findByIdSignaturePackage);
router.post('/', authToken, authorization.accessLevel(4), signaturePackageController.createSignaturePackage);
router.put('/:id', authToken, authorization.accessLevel(4), signaturePackageController.updateSignaturePackage);
router.delete('/:id', authToken, authorization.accessLevel(4), signaturePackageController.deleteSignaturePackage);

module.exports = router;