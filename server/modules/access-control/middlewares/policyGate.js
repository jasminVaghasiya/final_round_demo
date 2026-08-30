const { subject, ForbiddenError } = require('@casl/ability');

/**
 * Two-Tier Policy Gate Middleware
 * Tier 1: CASL Rule Engine Instance & Field Evaluation
 * Tier 2: Domain Business Policy Evaluation
 */
const policyGate = (policy, methodName, loader, options = {}) => {
  if (!policy) {
    throw new Error('Policy instance not provided to policyGate');
  }
  if (typeof policy[methodName] !== 'function') {
    throw new Error(`Policy method '${methodName}' not found on policy instance`);
  }

  return async (req, res, next) => {
    try {
      let loaded;

      // Reuse pre-loaded resource from authContext if loader is omitted
      if (!loader && req.authContext?.company) {
        loaded = req.authContext.company;
      } else if (typeof loader === 'function') {
        loaded = await loader(req);
      } else {
        loaded = loader;
      }

      const isWrapper = loaded && typeof loaded === 'object' && 'target' in loaded;
      let target;
      let rawExtraArgs = [];

      if (isWrapper) {
        target = typeof loaded.target === 'function' ? await loaded.target(req) : await loaded.target;
        rawExtraArgs = Array.isArray(loaded.extraArgs) ? loaded.extraArgs : [];
      } else {
        target = loaded;
      }

      const extraArgs = await Promise.all(
        rawExtraArgs.map((arg) => (typeof arg === 'function' ? arg(req) : arg))
      );

      if (!target && options.requireTarget !== false) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: 'Requested resource not found',
        });
      }

      // TIER 1: CASL Rule Engine Instance Evaluation
      if (options.subjectName && options.action) {
        if (!req.ability) {
          throw new Error('req.ability is not defined. Ensure attachAbility middleware runs before policyGate.');
        }

        const caslSubject = target ? subject(options.subjectName, target) : options.subjectName;
        ForbiddenError.from(req.ability).throwUnlessCan(options.action, caslSubject);

        // Field level permissions checking
        const fields = options.fieldsFrom ? options.fieldsFrom(req) : [];
        for (const field of fields) {
          ForbiddenError.from(req.ability).throwUnlessCan(options.action, caslSubject, field);
        }
      }

      // TIER 2: Domain Business Policy Evaluation
      const result = await policy[methodName](req.user || {}, target, ...extraArgs);

      if (!result.state) {
        return res.status(403).json({
          status: 403,
          success: false,
          message: result.reason || 'Access denied by domain policy',
        });
      }

      req.target = target;
      next();
    } catch (error) {
      if (error instanceof ForbiddenError || error?.name === 'ForbiddenError' || error?.name === 'CaslForbiddenError') {
        return res.status(403).json({
          status: 403,
          success: false,
          message: 'Access denied: ' + (error.message || 'Forbidden operation'),
        });
      }

      console.error('PolicyGate Evaluation Error:', error);
      next(error);
    }
  };
};

module.exports = policyGate;
