const express = require('express');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const userRoutes = require('./modules/users/routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;