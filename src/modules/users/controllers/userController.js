const userModel = require('../models/userModel');
const loginValidation = require('../validators/loginValidator');
const userValidation = require('../validators/userValidator');
const format = require('../../../utils/function_formatText');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateEnvVariables = require('../../../utils/function_validatesEnv');

const userController = {
    login: async (req, res) => {
        try {
            const { error } = loginValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const variablesResult = await validateEnvVariables(['JWT_SECRET']);
            if (!variablesResult) {
                return res.status(500).json({ error: 'Environment variable JWT_SECRET is not set properly.' });
            }

            const { login, password } = req.body;

            const user = login.includes('@')
                ? await userModel.findByEmail(login)
                : await userModel.findByCpf(login);

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error while logging in' });
        }
    },
  
    register: async (req, res) => {
        try {
            const { error } = userValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const { full_name, cpf, password, email } = req.body;
    
            const formatName = await format.formatText(full_name);
            const formatEmail = await format.formatEmail(email);
        
            const [emailExists, cpfExists] = await Promise.all([
                userModel.findByEmail(formatEmail),
                userModel.findByCpf(cpf),
            ]);
    
            if (emailExists) {
                return res.status(400).json({ error: 'Email already registered' });
            }
    
            if (cpfExists) {
                return res.status(400).json({ error: 'CPF already registered' });
            }
    
            const hash = await bcrypt.hash(password, 10);
    
            const newUser = {
                full_name: formatName,
                cpf,
                email: formatEmail,
                password: hash,
            };
    
            const user = await userModel.create(newUser);
            
            const createdUser = await userModel.findById(user);
            return res.status(201).json(createdUser);
        } catch (error) {
            return res.status(500).json({ error: 'Internal error when registering new user.' });
        }
    },    
}

module.exports = userController;
