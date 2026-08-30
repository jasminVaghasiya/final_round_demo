const { verifyToken } = require('../utils/jwt');
const { ApiError } = require('../middlewares/error.middleware');
const User = require('../modules/users/user.model');

/**
 * Authentication Middleware
 * Validates JWT token and loads user info onto req.user
 * Allows optional bypass for pending users when checking /me or join request status
 */
const authenticate = (allowPending = false) => async (req, res, next) => {
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

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).populate('companyId', 'name code isActive');

    if (!user) {
      return next(new ApiError(401, 'User associated with token no longer exists.'));
    }

    // Account status validation
    if (user.status === 'SUSPENDED') {
      return next(new ApiError(403, 'Your account has been suspended. Contact your administrator.'));
    }

    if (user.status === 'REJECTED' && !allowPending) {
      return next(new ApiError(403, 'Your request to join the company was rejected.'));
    }

    if (user.status === 'PENDING' && !allowPending) {
      return next(new ApiError(403, 'Your company join request is still pending. Access restricted.'));
    }

    req.user = user;
    req.userId = user._id;
    req.companyId = user.companyId ? user.companyId._id : null;
    req.userRole = user.role;

    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, invalid authentication token'));
  }
};

module.exports = {
  authenticate,
};
