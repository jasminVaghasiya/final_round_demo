const Company = require('./company.model');
const User = require('../users/user.model');
const JoinRequest = require('../join-requests/joinRequest.model');
const { generateToken } = require('../../utils/jwt');
const { generateCompanyCode } = require('../../utils/generateCompanyCode');
const { executeInTransaction } = require('../../utils/transactionHelper');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * POST /api/companies/register
 * Atomic Transaction: Create Company -> Update Creator -> Token
 */
const registerCompany = async (req, res, next) => {
  try {
    const { companyName } = req.body;
    const userId = req.user._id;

    if (!companyName || !companyName.trim()) {
      return next(new ApiError(400, 'Company name is required'));
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return next(new ApiError(404, 'User not found'));
    }

    if (existingUser.companyId && existingUser.status === 'ACTIVE') {
      return next(new ApiError(400, 'You are already an active member of a company'));
    }

    const result = await executeInTransaction(async (session) => {
      let code;
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 10) {
        code = generateCompanyCode(companyName);
        const existing = await Company.findOne({ code }).session(session);
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        throw new ApiError(500, 'Failed to generate a unique company code. Please try again.');
      }

      const newCompany = new Company({
        name: companyName.trim(),
        code,
        createdBy: userId,
      });
      await newCompany.save({ session });

      existingUser.companyId = newCompany._id;
      existingUser.role = 'ADMIN';
      existingUser.status = 'ACTIVE';
      await existingUser.save({ session });

      await JoinRequest.updateMany(
        { userId, status: 'PENDING' },
        { status: 'REJECTED', rejectionReason: 'User created their own company' }
      ).session(session);

      return { company: newCompany, user: existingUser };
    });

    const token = generateToken({
      userId: result.user._id,
      companyId: result.company._id,
      role: result.user.role,
    });

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: {
        token,
        company: {
          id: result.company._id,
          name: result.company.name,
          code: result.company.code,
        },
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          companyId: result.company._id,
          status: result.user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/companies/code/:code
 * Get company summary by company code
 */
const getCompanyByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    if (!code) {
      return next(new ApiError(400, 'Company code is required'));
    }

    const company = await Company.findOne({ code: code.toUpperCase().trim() }).select(
      'name code createdBy createdAt'
    );

    if (!company) {
      return next(new ApiError(404, 'Company not found with this code'));
    }

    res.status(200).json({
      success: true,
      data: {
        company: {
          id: company._id,
          name: company.name,
          code: company.code,
          createdAt: company.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCompany,
  getCompanyByCode,
};
