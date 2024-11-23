const userModel = require('../models/userModel');
const loginValidation = require('../validators/loginValidator');
const userValidation = require('../validators/userValidator');
const format = require('../../../utils/function_formatText');
const bcrypt = require('bcrypt');

const userController = {
    login: async (req, res) => {
        try {
            const { error } = loginValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { email, password } = req.body;

            const { error: loginError, token } = await loginUser(email, password);

            if (loginError) {
                return res.status(401).json({ error: loginError });
            }

            return res.status(200).json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Internal error while logging in' });
        }
    },

    register: async (req, res) => {
        try {
            const { error } = userValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const userData = req.body;

            const { error: registerError, user } = await registerUser(userData);

            if (registerError) {
                return res.status(400).json({ error: registerError });
            }

            return res.status(201).json(user);
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json({ error: 'Internal error while registering user' });
        }
    },
}

module.exports = userController;
