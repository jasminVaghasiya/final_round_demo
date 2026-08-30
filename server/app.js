const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/env');
const { errorHandler, ApiError } = require('./middlewares/error.middleware');

// Register all Mongoose Models from Modular Directory Architecture
require('./models');

// Import Modular Module Routes directly from server/modules/
const authRoutes = require('./modules/auth/auth.routes');
const companyRoutes = require('./modules/companies/company.routes');
const joinRequestRoutes = require('./modules/join-requests/joinRequest.routes');
const userRoutes = require('./modules/users/user.routes');
const departmentRoutes = require('./modules/departments/department.routes');
const roleRoutes = require('./modules/roles/role.routes');

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

// Parse JSON request body (10mb limit to support avatar image uploads)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request body
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    environment: config.env,
  });
});

// Mount Modular REST API Routes (server/modules/)
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/join-requests', joinRequestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Central Error Handler Middleware
app.use(errorHandler);

module.exports = app;
