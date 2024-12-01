const express = require('express');
const cors = require('cors');
const userRoutes = require('./modules/users/routes/userRoutes');
const app = express();

// Configura o middleware CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://advancemais-front.vercel.app'], // Adicione os domínios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());
app.use('/api', userRoutes);

module.exports = app;