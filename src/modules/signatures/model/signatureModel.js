const { knexInstance } = require('../../../config/db');

const signatureModel = {
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
}

module.exports = signatureModel;