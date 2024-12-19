const express = require("express");
const app = express();
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./config/swagger");
const userRoutes = require("./modules/users/routes/userRoutes");
const passwordResetRoutes = require("./modules/users/routes/passwordResetRoutes");
const vacanciesRoutes = require('./modules/vacancies/routes/vacanciesRoutes');
const budgetRoutes = require('./modules/budget/routes/budgetRoutes');
// Configura o middleware CORS
app.use(
  cors({
    // Adicione os domínios permitidos
    origin: ["http://localhost:3000", "https://advancemais-front.vercel.app"],
    // Métodos HTTP permitidos
    methods: ["GET", "POST", "PUT", "DELETE"],
    // Cabeçalhos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", passwordResetRoutes);
app.use("/api", vacanciesRoutes);
app.use("/api", budgetRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
