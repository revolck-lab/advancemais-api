const knex = require("knex");
const dotenv = require("dotenv");
// Configura o dotenv
dotenv.config({ path: "./src/config/env/.env.development" });

let databaseInstance = null;
// Função para criar uma instância do knex
const connectDatabase = async () => {
  if (!databaseInstance) {
    databaseInstance = knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        ssl: false,
      },
      pool: { min: 2, max: 10 },
    });
  }
  return databaseInstance;
};

// Função para testar a conexão com o banco de dados
const testDatabaseConnection = async (databaseInstance) => {
  try {
    await databaseInstance.raw("SELECT 1");
    console.log("Database connected...");
  } catch (error) {
    console.log("Database connection failed:", error.message);
    throw new Error("Database connection failed");
  }
};

// Event Listener para fechamento seguro do banco
process.on("exit", async () => {
  if (databaseInstance) {
    try {
      await databaseInstance.destroy();
      console.log("Database connection closed gracefully on exit.");
    } catch (error) {
      console.error("Error during database shutdown:", error.message);
    }
  }
});

module.exports = {
  connectDatabase,
  testDatabaseConnection,
};
