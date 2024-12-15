const express = require("express");
const app = express();
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./config/swagger");
const userRoutes = require("./modules/users/routes/userRoutes");
const courseRoutes = require("./modules/course/routes/courseRoutes");
const passwordResetRoutes = require("./modules/users/routes/passwordResetRoutes");

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
app.use("/api", courseRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
