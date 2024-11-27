const app = require('../app');
const connectDatabase = require('./db');
const validateEnvVariables = require('../utils/function_validatesEnv');

const startServer = async () => {
    try {
        const variablesResult = await validateEnvVariables(['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT', 'JWT_SECRET', 'PORT']);
        if (!variablesResult.success) {
            console.error(`Environment variable validation failed: ${variablesResult.message}`);
            process.exit(1);
        }

        const dbStatus = await connectDatabase();
        if (!dbStatus.success) {
            console.error('Database connection failed:', dbStatus.error || 'Unknown error');
            process.exit(1);
        }

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log('Server online');
        });
    } catch (error) {
        console.error('Critical error during server initialization:', error);
        process.exit(1);
    }
};

startServer();