const recoveryService = require('../services/passwordRecoveryService');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
// const loginValidation = require('../validators/loginValidator');

const recoveryController = {
  requestPasswordRecovery: async (req, res) => {
    try {
      const { error } = loginValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { login } = req.body;

      const user = login.length > 11
                  ? await companyModel.findByCnpj(login)
                  : await userModel.findByCpf(login);

      if (!user) return { error: 'Invalid credentials' };

      const emailResult = await recoveryService(login, user.email);
      
      return res.status(200).json({ message: 'Recovery email sent successfully.', details: emailResult });
    } catch (error) {
      console.error('Password recovery error:', error.message);
      return res.status(500).json({ message: 'Error requesting password recovery.', error: error.message });       
    }
  }
};

module.exports = recoveryController;