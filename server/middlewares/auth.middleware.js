const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { ApiError } = require('./error.middleware');
const User = require('../modules/users/user.model');
const { defineAbilityFor } = require('../modules/users/user.ability');

/**
 * Authentication Middleware
 * Verifies Bearer JWT token in Authorization header
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Authentication token missing. Please log in.'));
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Fetch active user from database
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(new ApiError(401, 'User associated with token no longer exists or is inactive'));
    }

    // Attach user and CASL abilities to request
    req.user = user;
    req.ability = defineAbilityFor(user);

    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, invalid token'));
  }
};

module.exports = {
  protect,
};
