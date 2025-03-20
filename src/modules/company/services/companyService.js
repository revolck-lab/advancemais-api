const companyModel = require('../models/companyModel');
const addressModel = require('../../users/models/addressModel');
const bcrypt = require('bcrypt');

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
  createCompany: async (companyData) => {
    const {
        cnpj,
        trade_name,
        business_name,
        contact_name,
        address,
        number,
        city,
        state_id,
        cep,
        whatsapp,
        mobile_phone,
        landline_phone,
        email,
        password,
        role_id
    } = companyData;

    const [emailExists, cnpjExists] = await Promise.all([
        companyModel.findByEmail(email),
        companyModel.findByCnpj(cnpj)
    ]);

    if (emailExists) {
        return { error: 'Email already registered' };
    }

    if (cnpjExists) {
        return { error: 'CNPJ already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const addressData = {
        address,
        number,
        city,
        state_id,
        cep
    };

    const addressId = await addressModel.create(addressData);

    const companyId = await companyModel.createCompany({
        cnpj,
        trade_name,
        business_name,
        contact_name,
        address_id: addressId,
        whatsapp,
        mobile_phone,
        landline_phone,
        email,
        password: hashedPassword,
        role_id
    });

    const newCompany = await companyModel.getCompanyById(companyId);
    delete newCompany.password;

    return { company: newCompany };
  }
};

module.exports = companyService;
