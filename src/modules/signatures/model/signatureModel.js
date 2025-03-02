const { knexInstance } = require('../../../config/db');

const signaturePackageModel = {
  getAllSignature: async () => {
    const db = await knexInstance();
    return db('signatures_packages').first();
  },
  getSignatureById: async (id) => {
    const db = await knexInstance();
    return db('signatures_packages').where({ id }).first();
  },
  updateSignature: async (id, signature) => {
    const db = await knexInstance();
    return db('signatures_packages').where({ id }).update(signature);
  },
  createSignature: async (signature) => {
    const db = await knexInstance();
    const [id] = await db('signatures_packages').insert(signature);
    return id;
  },
  deleteSignature: async () => {
    const db = await knexInstance();
    return db('signatures_packages').where({ id }).del();
  },
};

const signatureModel = {
  getAllSignatures: async () => {
    const db = await knexInstance();
    return db('signatures').select();
  },
  getSignatureById: async (id) => {
    const db = await knexInstance();
    return db('signatures').where({ id }).first();
  },
  updateSignature: async (id, signature) => {
    const db = await knexInstance();
    return db('signatures').where({ id }).update(signature);
  },
  createSignature: async (signature) => {
    const db = await knexInstance();
    const [id] = await db('signatures').insert(signature);
    return id;
  },
  deleteSignature: async (id) => {
    const db = await knexInstance();
    return db('signatures').where({ id }).del();
  },
};

module.exports = {
  signaturePackageModel,
  signatureModel,
};