const jwt = require('jsonwebtoken');
const connectDatabase = require('../config/db');

const authToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication error' });
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await connectDatabase('users').where({ id: decode.id }).first();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Authentication error' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Authentication error' });
        }

        return res.status(500).json({ error: 'Internal server error in authentication' });
    }
};

module.exports = authToken;
