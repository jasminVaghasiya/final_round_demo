const JoinRequest = require('./joinRequest.model');
const Company = require('../companies/company.model');
const User = require('../users/user.model');
const { generateToken } = require('../../utils/jwt');
const { executeInTransaction } = require('../../utils/transactionHelper');
const { ApiError } = require('../../middlewares/error.middleware');

const submitJoinRequest = async (req, res, next) => {
  try {
    const { companyCode } = req.body;
    const userId = req.user._id;

    if (!companyCode || !companyCode.trim()) {
      return next(new ApiError(400, 'Company code is required'));
    }

    const company = await Company.findOne({ code: companyCode.toUpperCase().trim() });
    if (!company) {
      return next(new ApiError(404, 'No organization found with this code'));
    }

    const user = await User.findById(userId);
    if (user.companyId && user.status === 'ACTIVE') {
      return next(new ApiError(400, 'You are already an active member of an organization'));
    }

    const existingPending = await JoinRequest.findOne({
      userId,
      companyId: company._id,
      status: 'PENDING',
    });

    if (existingPending) {
      return next(new ApiError(409, 'You already have a pending join request for this company'));
    }

    const joinRequest = new JoinRequest({
      userId,
      companyId: company._id,
      status: 'PENDING',
    });

    await joinRequest.save();

    res.status(201).json({
      success: true,
      message: 'Join request submitted successfully. Waiting for admin approval.',
      data: {
        joinRequest: {
          id: joinRequest._id,
          companyName: company.name,
          companyCode: company.code,
          status: joinRequest.status,
          createdAt: joinRequest.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyJoinRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const latestRequest = await JoinRequest.findOne({ userId })
      .populate('companyId', 'name code')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        joinRequest: latestRequest
          ? {
              id: latestRequest._id,
              companyName: latestRequest.companyId?.name,
              companyCode: latestRequest.companyId?.code,
              status: latestRequest.status,
              rejectionReason: latestRequest.rejectionReason,
              createdAt: latestRequest.createdAt,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyJoinRequests = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    const requests = await JoinRequest.find({ companyId })
      .populate('userId', 'name email role createdAt status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        joinRequests: requests,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getJoinRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    const joinRequest = await JoinRequest.findOne({ _id: id, companyId }).populate(
      'userId',
      'name email role createdAt status'
    );

    if (!joinRequest) {
      return next(new ApiError(404, 'Join request not found'));
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

const approveJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.user._id;
    const companyId = req.user.companyId;

    const result = await executeInTransaction(async (session) => {
      const joinRequest = await JoinRequest.findOne({
        _id: id,
        companyId,
        status: 'PENDING',
      }).session(session);

      if (!joinRequest) {
        throw new ApiError(404, 'Pending join request not found');
      }

      const applicant = await User.findById(joinRequest.userId).session(session);
      if (!applicant) {
        throw new ApiError(404, 'Applicant user account not found');
      }

      joinRequest.status = 'APPROVED';
      joinRequest.reviewedBy = adminId;
      await joinRequest.save({ session });

      applicant.companyId = companyId;
      applicant.status = 'ACTIVE';
      if (!applicant.role || applicant.role === 'MEMBER') {
        applicant.role = 'EMPLOYEE';
      }
      await applicant.save({ session });

      await JoinRequest.updateMany(
        { userId: applicant._id, status: 'PENDING', _id: { $ne: joinRequest._id } },
        { status: 'REJECTED', rejectionReason: 'Approved for another company' }
      ).session(session);

      return { joinRequest, applicant };
    });

    res.status(200).json({
      success: true,
      message: `Approved ${result.applicant.name}'s request to join company.`,
      data: {
        user: {
          id: result.applicant._id,
          name: result.applicant.name,
          email: result.applicant.email,
          role: result.applicant.role,
          companyId: result.applicant.companyId,
          status: result.applicant.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const rejectJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = req.user._id;
    const companyId = req.user.companyId;

    const joinRequest = await JoinRequest.findOne({
      _id: id,
      companyId,
      status: 'PENDING',
    });

    if (!joinRequest) {
      return next(new ApiError(404, 'Pending join request not found'));
    }

    joinRequest.status = 'REJECTED';
    joinRequest.reviewedBy = adminId;
    joinRequest.rejectionReason = reason ? reason.trim() : 'Rejected by company administrator';
    await joinRequest.save();

    res.status(200).json({
      success: true,
      message: 'Join request rejected.',
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
