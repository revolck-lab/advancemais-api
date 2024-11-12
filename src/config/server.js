const app = require('../app');
const  connectDatabase = require('./db');

const startServer = async () => {
    const dbStatus = await connectDatabase();
    if (dbStatus.success) {
        app.listen(process.env.PORT, () => {
            console.log(`Server running in production`);
        });
    } else {
        console.error('Failed to start server due to database connection issues.');
    }
};

startServer();