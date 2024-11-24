const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const addressModel = require('../models/addressModel');
const generateCode = require('../../../utils/generateCode');

const loginUser =  async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) return { error: 'Invalid credentials' };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { error: 'Invalid credentials' };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { token };
};

const registerUser = async (userData) => {
    const {
        name,
        email,
        password,
        birth_date,
        cpf,
        phone_user,
        gender_id,
        education_id,
        role_id,
        address,   
        city,
        state,
        cep,
    } = userData;

    const [emailExists, cpfExists] = await Promise.all([
        userModel.findByEmail(email),
        userModel.findByCpf(cpf)
    ]);

    if (emailExists) {
        return { error: 'Email already registered' };
    }

    if (cpfExists) {
        return { error: 'CPF already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const addressData = { 
        address, 
        city, 
        state, 
        cep 
    };
    
    const addressId = await addressModel.create(addressData);

    const codeUser = generateCode();

    const userId = await userModel.create({
        name,
        email,
        password: hashedPassword,
        birth_date,
        cpf,
        phone_user,
        gender_id,
        education_id,
        role_id,
        address_id: addressId,  
        code_user: codeUser,
    });

    const newUser = await userModel.findById(userId);
    delete newUser.password;

    return { user: newUser };
};

module.exports = { 
    loginUser, 
    registerUser
};