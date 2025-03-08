const express = require("express");
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./config/swagger");
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
const signatureRoutes = require("./modules/signatures/routes/signatureRoutes");

// const subscriptionRoutes = require('./modules/subscriptionRoutes');

//Middleware
=======
const paymentRoutes = require("./modules/mercadoPago/routes/paymentsRoute");

const authToken = require("./middlewares/authMiddleware");

const app = express();

// Configuração do CORS
app.use(cors({
    origin: ["http://localhost:3000", "https://advancemais.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite envio de cookies, se necessário
}));

app.use(express.json());

// Rotas públicas
app.use("/api/auth", userRoutes);
app.use("/api/password", passwordResetRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota específica do webhook (sem autenticação)
app.use("/api/mercadoPago/checkout/webhook", paymentRoutes);

// Middleware de autenticação para outras rotas protegidas
app.use(authToken);

// Rotas protegidas
app.use("/api/course", courseRoutes);
app.use("/api/vacancy", vacanciesRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/carouselCompany", carouselCompanyRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/business_info", businessRoutes);
app.use("/api/signatures", signatureRoutes);
// app.use('/api', subscriptionRoutes);
=======
app.use("/api/mercadoPago", paymentRoutes);

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

// Tratamento de erros genéricos
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack);
    res.status(500).json({ error: "Erro interno do servidor" });
});

module.exports = app;