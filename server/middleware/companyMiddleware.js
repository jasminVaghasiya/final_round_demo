const { ApiError } = require('../middlewares/error.middleware');

/**
 * Company Scope Middleware
 * Ensures user belongs to an active company
 */
const requireCompany = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'User context not found. Authentication required.'));
  }

  if (!req.user.companyId) {
    return next(new ApiError(403, 'Access denied: User is not associated with any company.'));
  }

  if (typeof req.user.companyId === 'object' && req.user.companyId.isActive === false) {
    return next(new ApiError(403, 'Access denied: Associated company is inactive or suspended.'));
  }

  next();
};

module.exports = {
  requireCompany,
};
