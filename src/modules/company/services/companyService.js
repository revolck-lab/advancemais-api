const companyModel = require('../models/companyModel');

const companyService = {
  getAllCompanies: async () => {
    return await companyModel.getAllCompanies();
  },
  getCompanyByCnpj: async (cnpj) => {
    return await companyModel.getCompanyByCnpj(cnpj);
  },
  getCompanyById: async (id) => {
    return await companyModel.getCompanyById(id);
  },
  getCompaniesByStatus: async (status) => {
    return await companyModel.getCompaniesByStatus(status);
  },
  updateCompany: async (id, company) => {
    await companyModel.updateCompany(id, company);
  },
  deleteCompany: async (id) => {
    await companyModel.deleteCompany(id);
  },
  createCompany: async (company) => {
    const id = await companyModel.createCompany(company);
    return id;
  }
};

module.exports = companyService;