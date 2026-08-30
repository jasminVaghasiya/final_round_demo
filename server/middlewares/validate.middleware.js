const Joi = require('joi');
const { ApiError } = require('./error.middleware');

/**
 * Joi Schema Validation Middleware
 * Validates req.params, req.query, and req.body against schema definitions
 * @param {Object} schema - Joi schema object with optional params, query, body keys
 */
const validate = (schema) => (req, res, next) => {
  const validSchema = ['params', 'query', 'body'].reduce((acc, key) => {
    if (schema[key]) {
      acc[key] = schema[key];
    }
    return acc;
  }, {});

  const object = ['params', 'query', 'body'].reduce((acc, key) => {
    if (schema[key]) {
      acc[key] = req[key];
    }
    return acc;
  }, {});

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
