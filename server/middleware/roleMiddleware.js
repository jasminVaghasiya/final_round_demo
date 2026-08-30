const { ApiError } = require('../middlewares/error.middleware');

/**
 * Role Authorization Middleware
 * Enforces allowed roles for protected routes
 * @param  {...string} allowedRoles - e.g. 'ADMIN', 'HOD', 'MANAGER'
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'User context not found. Authentication required.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Forbidden: Role '${req.user.role}' is not authorized to access this resource`
        )
      );
    }

    next();
  };
};

module.exports = {
  authorize,
};
