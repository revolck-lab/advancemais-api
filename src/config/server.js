const app = require("../app");
const connectDatabase = require("./db");
const validateEnvVariables = require("../utils/validatesEnv");
const { verifyConnection } = require("../services/emailServices");

const startServer = async () => {
    try {
        await validateEnvVariables([
            "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_DATABASE", "DB_PORT", 
            "JWT_SECRET", 
            "PORT", 
            "SMTP_HOST", "SMTP_PASS", "SMTP_PORT", "SMTP_USER"
        ]);
        
        const dbStatus = await connectDatabase();
        if (!dbStatus.success) {
            console.error("Database connection failed:", dbStatus.error || "Unknown error");
            process.exit(1);
        }
        
        await verifyConnection();

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("Server online");
        });
    } catch (error) {
        console.error("Critical error during server initialization:", error);
        process.exit(1);
    }
};

startServer();