const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Sign JWT Token with payload containing userId, companyId, and role
 * @param {Object} payload 
 * @returns {string} Signed JWT Token
 */
const signToken = (payload) => {
  return jwt.sign(
    {
      userId: payload.userId,
      companyId: payload.companyId,
      role: payload.role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

/**
 * Verify JWT Token
 * @param {string} token 
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = {
  signToken,
  verifyToken,
};
