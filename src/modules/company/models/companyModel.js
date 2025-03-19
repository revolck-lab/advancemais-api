const { knexInstance } = requeire('../../../config/db.js');

const companyModel = {
  getCompanyByCnpj: async (cnpj) => {
    const db = knexInstance();
    return db('company').where({ cnpj }).first();
  },
  getCompanyById: async (id) => {
    const db = knexInstance();
    return db('company').where({ id }).first();
    },
  getCompaniesByStatus: async (status) => {
    const db = knexInstance();
    return db('company').where({ status });
    },
  updateCompany: async (id, company) => {
    const db = knexInstance();
    return db('company').where({ id }).update(company);
    },
  deleteCompany: async (id) => {
    const db = knexInstance();
    return db('company').where({ id }).del();
  },
  createCompany: async (company) => {
    const db = knexInstance();
    const [id] = await db('company').insert(company);
    return id;
  }
};

module.exports = companyModel;