const { defineAbilitiesFor } = require('../abilities/defineAbility');
const Company = require('../../companies/company.model');
const User = require('../../users/user.model');
const { ROLE } = require('../models/types');

/**
 * Middleware to attach CASL ability & domain authorization context to req.ability and req.authContext
 */
const attachAbility = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized access' });
    }

    const userId = req.user.payload?.user || req.user.user || req.user._id || req.user.id;
    const companyId = req.params?.companyId || req.query?.companyId || req.body?.companyId || req.user.companyId;

    let role = req.user.role || ROLE.EMPLOYEE;
    let companyRecord = null;
    let userRecord = null;

    if (userId) {
      userRecord = await User.findById(userId).populate('departmentId');
      if (userRecord) {
        role = userRecord.role || role;
      }
    }

    if (companyId) {
      companyRecord = await Company.findById(companyId);
      if (companyRecord && companyRecord.createdBy && companyRecord.createdBy.toString() === userId?.toString()) {
        role = ROLE.CREATOR;
      }
    }

    // Cache loaded authorization context
    req.authContext = {
      company: companyRecord,
      group: companyRecord,
      userRecord,
      role,
      userId: userId ? userId.toString() : null,
      companyId: companyId ? companyId.toString() : null,
    };

    // Enrich user object for CASL rule evaluation
    const enrichedUser = {
      ...req.user,
      id: userId ? userId.toString() : undefined,
      _id: userId ? userId.toString() : undefined,
      role,
      companyId: companyId ? companyId.toString() : undefined,
      departmentId: userRecord?.departmentId?._id ? userRecord.departmentId._id.toString() : undefined,
    };

    req.ability = defineAbilitiesFor(enrichedUser);
    next();
  } catch (error) {
    console.error('Error in attachAbility middleware:', error);
    return res.status(500).json({ status: 500, success: false, message: 'Internal authorization error' });
  }
};

module.exports = attachAbility;
