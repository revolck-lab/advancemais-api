const signatureService = require('../services/signatureService');
const { packageValidation, signatureValidation } = require('../validators/signaturesValidator');

const signaturePackageController = {
  getAllPackages: async (req, res) => {
    try {
      const packages = await signatureService.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getPackageDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const packageDetails = await signatureService.getPackageDetails(id);
      res.json(packageDetails);
    } catch (error) {
      res.status(404).json({ error: 'Package not found' });
    }
  },
  createPackage: async (req, res) => {
    try {
      const { error } = await signatureValidation.validate(req, res);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const packageData = req.body;

      const packageId = await signatureService.createPackage(packageData);
      res.status(201).json({ message: 'Package created successfully', packageId });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to create package' });
    }
  },

  updatePackage: async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = await packageValidation.validate(req, res);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const updatedPackage = req.body;
      await signatureService.updatePackage(id, updatedPackage);
      res.status(200).json({ message: 'Package updated successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Package not found' });
    }
  },

  deletePackage: async (req, res) => {
    try {
      const { id } = req.params;
      await signatureService.deletePackage(id);
      res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Package not found' });
    }
  },
};

module.exports = signaturePackageController;
