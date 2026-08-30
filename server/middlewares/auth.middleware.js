const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { ApiError } = require('./error.middleware');
const User = require('../modules/users/user.model');

/**
 * Authentication Protection Middleware
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
    const targetUserId = decoded.userId || decoded.id;

    if (!targetUserId) {
      return next(new ApiError(401, 'Invalid authentication token payload'));
    }

    // Fetch user from database
    const user = await User.findById(targetUserId)
      .populate('companyId', 'name code isActive')
      .populate('departmentId', 'name code');

    if (!user) {
      return next(new ApiError(401, 'User associated with token no longer exists'));
    }

    if (user.status === 'SUSPENDED') {
      return next(new ApiError(403, 'Your account has been suspended. Contact administrator.'));
    }

    // Attach user and IDs to request
    req.user = user;
    req.userId = user._id;
    req.companyId = user.companyId ? user.companyId._id : null;

    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, invalid token'));
  }
};

module.exports = {
  protect,
};
