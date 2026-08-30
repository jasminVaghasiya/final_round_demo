const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/env');
const { errorHandler, ApiError } = require('./middlewares/error.middleware');

// Register all Mongoose Models
require('./models');

// Import Module Routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const joinRequestRoutes = require('./routes/joinRequestRoutes');

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// HTTP request logger
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    environment: config.env,
  });
});

// Mount REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/join-requests', joinRequestRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Central Error Handler Middleware
app.use(errorHandler);

module.exports = app;
