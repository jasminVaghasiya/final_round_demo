const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('admin', 'agent', 'customer').default('customer'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
