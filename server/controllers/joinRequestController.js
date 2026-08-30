const User = require('../models/User');
const Company = require('../models/Company');
const JoinRequest = require('../models/JoinRequest');
const { signToken } = require('../utils/jwt');
const { ApiError } = require('../middlewares/error.middleware');

/**
 * Submit Request to Join an Existing Company (Rules 4, 5, 6, 12)
 * Fully compatible with all MongoDB configurations
 */
const submitJoinRequest = async (req, res, next) => {
  let createdUserId = null;

  try {
    const { companyCode, name, email, phone, password, message } = req.body;

    if (!companyCode || !name || !email || !password) {
      throw new ApiError(400, 'Company code, name, email, and password are required.');
    }

    if (password.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters long.');
    }

    // 1. Verify company code
    const company = await Company.findOne({
      code: companyCode.trim().toUpperCase(),
      isActive: true,
    });

    if (!company) {
      throw new ApiError(404, 'Company code is invalid or company is unavailable.');
    }

    // 2. Check for existing user email
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email address already exists.');
    }

    // 3. Create User with PENDING status and default EMPLOYEE role (Rule 4: Cannot choose ADMIN)
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone || '',
      role: 'EMPLOYEE', // Force EMPLOYEE role for applicants
      companyId: company._id,
      status: 'PENDING', // Force PENDING status until Admin approves
    });

    await user.save();
    createdUserId = user._id;

    // 4. Create JoinRequest document
    const joinRequest = new JoinRequest({
      userId: user._id,
      companyId: company._id,
      requestedRole: 'EMPLOYEE',
      status: 'PENDING',
      message: message || '',
    });

    await joinRequest.save();

    // Issue pending token so applicant can monitor request status
    const pendingToken = signToken({
      userId: user._id,
      companyId: company._id,
      role: 'EMPLOYEE',
    });

    res.status(201).json({
      success: true,
      message: 'Join request submitted successfully. Waiting for administrator approval.',
      data: {
        token: pendingToken,
        user: user.toJSON(),
        joinRequest,
        company: {
          _id: company._id,
          name: company.name,
          code: company.code,
        },
      },
    });
  } catch (error) {
    if (createdUserId) {
      await User.deleteOne({ _id: createdUserId }).catch(() => {});
    }
    next(error);
  }
};

/**
 * Get Current User's Join Request Status
 */
const getMyJoinRequest = async (req, res, next) => {
  try {
    const joinRequest = await JoinRequest.findOne({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('companyId', 'name code city state email phone')
      .populate('reviewedBy', 'name email');

    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      data: {
        userStatus: user ? user.status : 'UNKNOWN',
        joinRequest,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: List All Join Requests for Admin's Company (Rule 10: Multi-Tenant Data Isolation)
 */
const getCompanyJoinRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { companyId: req.user.companyId };

    if (status && ['PENDING', 'APPROVED', 'REJECTED'].includes(status.toUpperCase())) {
      filter.status = status.toUpperCase();
    }

    const requests = await JoinRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone role status createdAt')
      .populate('reviewedBy', 'name email');

    res.status(200).json({
      success: true,
      data: {
        requests,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get Single Join Request Details
 */
const getJoinRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const joinRequest = await JoinRequest.findOne({
      _id: id,
      companyId: req.user.companyId,
    })
      .populate('userId', 'name email phone role status createdAt')
      .populate('reviewedBy', 'name email');

    if (!joinRequest) {
      return next(new ApiError(404, 'Join request not found or unauthorized'));
    }

    res.status(200).json({
      success: true,
      data: {
        joinRequest,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Approve Join Request (Assigns Role & Department)
 */
const approveJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, departmentId } = req.body;

    const joinRequest = await JoinRequest.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!joinRequest) {
      return next(new ApiError(404, 'Join request not found or unauthorized'));
    }

    if (joinRequest.status === 'APPROVED') {
      return next(new ApiError(400, 'Join request has already been approved.'));
    }

    const assignedRole = role && ['EMPLOYEE', 'MANAGER', 'HOD'].includes(role) ? role : 'EMPLOYEE';

    // 1. Update JoinRequest
    joinRequest.status = 'APPROVED';
    joinRequest.reviewedBy = req.userId;
    joinRequest.reviewedAt = new Date();
    await joinRequest.save();

    // 2. Update User to ACTIVE
    const user = await User.findById(joinRequest.userId);
    if (!user) {
      return next(new ApiError(404, 'User associated with request not found.'));
    }

    user.status = 'ACTIVE';
    user.role = assignedRole;
    if (departmentId) {
      user.departmentId = departmentId;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} approved successfully as ${assignedRole}`,
      data: {
        joinRequest,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Reject Join Request
 */
const rejectJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const joinRequest = await JoinRequest.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!joinRequest) {
      return next(new ApiError(404, 'Join request not found or unauthorized'));
    }

    // 1. Update JoinRequest
    joinRequest.status = 'REJECTED';
    joinRequest.rejectionReason = rejectionReason || 'Request rejected by company administrator.';
    joinRequest.reviewedBy = req.userId;
    joinRequest.reviewedAt = new Date();
    await joinRequest.save();

    // 2. Update User to REJECTED
    const user = await User.findById(joinRequest.userId);
    if (user) {
      user.status = 'REJECTED';
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Join request rejected successfully',
      data: {
        joinRequest,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitJoinRequest,
  getMyJoinRequest,
  getCompanyJoinRequests,
  getJoinRequestById,
  approveJoinRequest,
  rejectJoinRequest,
};
