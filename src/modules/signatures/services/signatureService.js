const signaturePackage = require('../model/signatureModel');

const signaturePackageService = {
  getSignature: async () => {
    const signature = await signaturePackage.getAllSignature();
    return signature;
  },
  getSignatureById: async (id) => {
    const signature = await signaturePackage.getSignatureById(id);
    return signature;
    },
  updateSignature: async (id, signature) => {
    await signaturePackage.updateSignature(id, signature);
    return true;
  },
  createSignature: async (signature) => {
    const id = await signaturePackage.createSignature(signature);
    return id;
  },
  deleteSignature: async (id) => {
    await signaturePackage.deleteSignature(id);
    return true;
  }
};

module.exports = signaturePackageService;