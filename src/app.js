const express = require("express");
const cors = require("cors");
//Documentação swagger
const { swaggerUi, swaggerDocs } = require("./config/swagger");
//Rotas
const userRoutes = require("./modules/users/routes/userRoutes");
const passwordResetRoutes = require("./modules/users/routes/passwordResetRoutes");
const bannerRoutes = require("./modules/cms/routes/bannerRoutes");
const carouselRoutes = require("./modules/cms/routes/carouselRoutes");
const carouselCompanyRoutes = require("./modules/cms/routes/carousel_companyRoutes");
const authToken = require("./middlewares/authMiddleware");
const authorization = require("./middlewares/middleware_roles/rolesMiddleware");
const budgetRoutes = require("./modules/budget/routes/budgetRoutes");
const courseRoutes = require("./modules/course/routes/courseRoutes");
const vacanciesRoutes = require("./modules/vacancies/routes/vacanciesRoutes");

const app = express();
// Configura o middleware CORS
app.use(cors({
    // Adicione os domínios permitidos
    origin: ["http://localhost:3000", "https://advancemais-front.vercel.app"],
    // Métodos HTTP permitidos
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Cabeçalhos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Rotas públicas
app.use("/api", userRoutes);
app.use("/api", passwordResetRoutes);
app.use("/api", budgetRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de autenticação
app.use(authToken);

// Rotas protegidas com níveis de autorização
app.use("/api", authorization.accessLevel(4), bannerRoutes);
app.use("/api", authorization.accessLevel(4), carouselRoutes);
app.use("/api", authorization.accessLevel(4), carouselCompanyRoutes);
app.use("/api", authorization.accessLevel(3), courseRoutes);
app.use("/api", authorization.accessLevel(3), vacanciesRoutes);

module.exports = app;
