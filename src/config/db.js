const knex = require("knex");
const dotenv = require("dotenv");
const validateEnvVariables = require("../utils/function_validatesEnv");

dotenv.config({ path: "./src/config/env/.env.development" });

let databaseInstance = null;

const connectDatabase = async () => {
    const variablesResult = validateEnvVariables(['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT']);
    if (!variablesResult.success) {
        console.error(variablesResult.message);
        return {
            success: false,
            message: "Environment variable validation failed.",
        };
    }

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
        });

        try {
            await databaseInstance.raw("SELECT 1");
            console.log("Database connected...");
            return { success: true, database: databaseInstance };
        } catch (error) {
            console.error("Database connection failed:", error.message);
            return { success: false, message: "Database connection failed" };
        }
    }
    return databaseInstance;
};

process.on("SIGINT", async () => {
    if (databaseInstance) {
        try {
            await databaseInstance.destroy();
            console.log("Database connection closed");
        } catch (error) {
            console.error("Error closing database connection:", error.message);
        }
    }
});

module.exports = connectDatabase;
