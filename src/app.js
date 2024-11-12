const express = require('express');
const userRoutes = require('./modules/users/routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);

module.exports = app;