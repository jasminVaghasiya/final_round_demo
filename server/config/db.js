const mongoose = require('mongoose');
const config = require('./env');

/**
 * Connect to MongoDB instance using Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Exit process with failure code if unable to establish DB connection
    process.exit(1);
  }
};

// Event listeners for MongoDB connection lifecycle
mongoose.connection.on('connected', () => {
  console.log('[MongoDB] Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB] Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Mongoose connection disconnected');
});

// Close database connection gracefully on application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[MongoDB] Connection closed due to app termination (SIGINT)');
  process.exit(0);
});

module.exports = connectDB;
