const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');

/**
 * Start Server & Database connection
 * Listens on host 0.0.0.0 for LAN access from other PCs
 */
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Listen on 0.0.0.0 to allow LAN access
  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(
      `[Server] HelpDesk API listening on http://0.0.0.0:${config.port} in ${config.env} mode`
    );
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`[UnhandledRejection] Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
