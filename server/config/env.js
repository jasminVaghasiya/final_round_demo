const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Define validation schema for environment variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string()
    .required()
    .description('MongoDB connection string URI'),
  JWT_SECRET: Joi.string()
    .min(10)
    .required()
    .description('Secret key for signing JSON Web Tokens'),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  CORS_ORIGIN: Joi.string().default('*'),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
    options: {},
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  corsOrigin: envVars.CORS_ORIGIN,
};
