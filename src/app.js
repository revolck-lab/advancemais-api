const express = require('express');
const app = express();
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const userRoutes = require('./modules/users/routes/userRoutes');
const passwordResetRoutes = require('./modules/users/routes/passwordResetRoutes');
const bannerRoutes = require('./modules/cms/routes/bannerRoutes');
const carouselRoutes = require('./modules/cms/routes/carouselRoutes');
const carouselCompanyRoutes = require('./modules/cms/routes/carousel_companyRoutes');
const authToken = require('./middlewares/authMiddleware');
const authorization = require('./middlewares/middleware_roles/rolesMiddleware');


// Configura o middleware CORS
app.use(cors({
    // Adicione os domínios permitidos
    origin: ['http://localhost:3000', 'https://advancemais-front.vercel.app'],
    // Métodos HTTP permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Cabeçalhos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', passwordResetRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', carouselRoutes);
app.use('/api', carouselCompanyRoutes);

app.use(authToken);
app.use('/api', authorization.accessLevel(4), bannerRoutes);
module.exports = app;