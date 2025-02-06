const express = require("express");
const cors = require("cors");
//Documentação swagger
const { swaggerUi, swaggerDocs } = require("./config/swagger");
//Rotas
const userRoutes = require("./modules/users/routes/userRoutes");
const passwordResetRoutes = require("./modules/users/routes/passwordResetRoutes");
const bannerRoutes = require("./modules/cms/routes/bannerRoutes");
const sliderRoutes = require("./modules/cms/routes/sliderRoutes");
const carouselRoutes = require("./modules/cms/routes/carouselRoutes");
const carouselCompanyRoutes = require("./modules/cms/routes/carousel_companyRoutes");
const budgetRoutes = require("./modules/budget/routes/budgetRoutes");
const courseRoutes = require("./modules/course/routes/courseRoutes");
const vacanciesRoutes = require("./modules/vacancies/routes/vacanciesRoutes");
const businessRoutes = require("./modules/cms/routes/business_informationRoutes");
const superAdminRoutes = require("./modules/cms/routes/superAdminRoutes");
// const subscriptionRoutes = require('./modules/subscriptionRoutes');

//Middleware
const authToken = require("./middlewares/authMiddleware");
// const Authorization = require("./middlewares/middleware_roles/rolesMiddleware");

const app = express();
// Configura o middleware CORS
app.use(cors({
    // Adicione os domínios permitidos
    origin: ["http://localhost:3000", "https://advancemais.vercel.app/"],
    // Métodos HTTP permitidos
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Cabeçalhos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Rotas públicas
app.use("/api/auth", userRoutes);
app.use("/api/password", passwordResetRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de autenticação
app.use(authToken);

// Rotas protegidas com níveis de autorização
app.use("/api/course", courseRoutes);
app.use("/api/vacancy", vacanciesRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/carouselCompany", carouselCompanyRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/business_info", businessRoutes);
// app.use('/api', subscriptionRoutes);

module.exports = app;
