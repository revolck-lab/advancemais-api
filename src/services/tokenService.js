const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const RESET_TOKEN_EXPIRATION = '1h';

const generationToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRATION });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generationToken,
    verifyToken
};