// server/server.js
require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Database connection and server start
async function startServer() {
  // Always start the HTTP server so the app is reachable
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });

  // Attempt DB connection separately — don't crash the server if DB is down
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.warn('Server is running but DB-backed routes will fail until the database is reachable.');
    console.warn('Make sure PostgreSQL is running and check your DB_* env vars.');
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();