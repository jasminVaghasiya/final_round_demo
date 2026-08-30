const { ApiError } = require('./error.middleware');

/**
 * CASL Authorization Middleware
 * Enforces action and subject permissions on request
 * @param {string} action - 'read', 'create', 'update', 'delete', 'manage'
 * @param {string} subject - Resource name e.g. 'Ticket', 'User', 'Comment'
 */
const checkAbility = (action, subject) => (req, res, next) => {
  if (!req.ability) {
    return next(new ApiError(500, 'CASL ability context not initialized'));
  }

  if (req.ability.cannot(action, subject)) {
    return next(new ApiError(430, `Forbidden: You do not have permission to ${action} ${subject}`));
  }

  next();
};

module.exports = {
  checkAbility,
};
