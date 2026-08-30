const User = require('./user.model');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * Modular User Management Controller
 */

// Helper to log audit events
const logAudit = async ({ admin, targetUser, action, description, previousValue, newValue, req }) => {
  try {
    const { AuditLog } = require('../audit-logs/auditLog.model');
    await AuditLog.create({
      companyId: admin.companyId,
      performedBy: admin._id,
      targetUser: targetUser ? targetUser._id : null,
      action,
      description,
      previousValue: previousValue || null,
      newValue: newValue || null,
      ipAddress: req.ip || req.connection?.remoteAddress || '',
      userAgent: req.get('User-Agent') || '',
    });
  } catch (err) {
    console.error('Failed to log audit event:', err.message);
  }
};

/**
 * GET /api/users - Get Paginated User Directory with Search & Filters
 */
const getUsers = async (req, res, next) => {
  try {
    const {
      search,
      role,
      departmentId,
      status,
      dateJoined,
      lastLogin,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 25,
    } = req.query;

    const query = { companyId: req.user.companyId };

    // HOD Department Scoping Rule
    if (req.user.role === 'HOD' && req.user.departmentId) {
      query.departmentId = req.user.departmentId;
    } else if (departmentId && departmentId !== 'ALL') {
      query.departmentId = departmentId;
    }

    if (role && role !== 'ALL') {
      query.role = role.toUpperCase();
    }

    if (status && status !== 'ALL') {
      query.status = status.toUpperCase();
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { userId: regex },
        { username: regex },
        { phone: regex },
        { designation: regex },
        { employeeStudentId: regex },
      ];
    }

    if (dateJoined && dateJoined !== 'ALL') {
      const now = new Date();
      let startDate = new Date();
      if (dateJoined === 'TODAY') startDate.setHours(0, 0, 0, 0);
      else if (dateJoined === 'THIS_WEEK') startDate.setDate(now.getDate() - 7);
      else if (dateJoined === 'THIS_MONTH') startDate.setMonth(now.getMonth() - 1);
      else if (dateJoined === 'LAST_3_MONTHS') startDate.setMonth(now.getMonth() - 3);
      else if (dateJoined === 'LAST_6_MONTHS') startDate.setMonth(now.getMonth() - 6);

      if (dateJoined !== 'ALL') {
        query.createdAt = { $gte: startDate };
      }
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const sortField = ['name', 'userId', 'role', 'departmentId', 'status', 'createdAt', 'lastLoginAt'].includes(sortBy)
      ? sortBy
      : 'createdAt';
    const sortOptions = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('departmentId', 'name code');

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalUsers,
          totalPages: Math.ceil(totalUsers / limitNum) || 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/stats - Summary Statistics
 */
const getUserStats = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    const [totalUsers, activeUsers, inactiveUsers, suspendedUsers] = await Promise.all([
      User.countDocuments({ companyId }),
      User.countDocuments({ companyId, status: 'ACTIVE' }),
      User.countDocuments({ companyId, status: 'INACTIVE' }),
      User.countDocuments({ companyId, status: 'SUSPENDED' }),
    ]);

    const roleBreakdown = await User.aggregate([
      { $match: { companyId } },
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          suspendedUsers,
          roleBreakdown: roleBreakdown.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
          }, {}),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id - Get User Details
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    }).populate('departmentId', 'name code description');

    if (!user) {
      return next(new ApiError(404, 'User not found or unauthorized'));
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users - Create User
 */
const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      alternatePhone,
      gender,
      dob,
      username,
      password,
      role,
      departmentId,
      designation,
      employeeStudentId,
      status,
      profileImage,
    } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Email and password are required.'));
    }

    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || req.body.name;
    if (!fullName) {
      return next(new ApiError(400, 'First Name or Full Name is required.'));
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return next(new ApiError(409, 'An account with this email address already exists.'));
    }

    if (username) {
      const existingUsername = await User.findOne({ username: username.toLowerCase().trim() });
      if (existingUsername) {
        return next(new ApiError(409, 'Username is already taken.'));
      }
    }

    if (req.user.role === 'HOD' && ['SUPER_ADMIN', 'ADMIN'].includes(role)) {
      return next(new ApiError(403, 'HOD users cannot create Administrative accounts.'));
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const userId = `USR-${randomNum}`;

    const newUser = new User({
      userId,
      firstName: firstName || '',
      lastName: lastName || '',
      name: fullName,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      alternatePhone: alternatePhone || '',
      gender: gender || '',
      dob: dob || null,
      username: username ? username.toLowerCase().trim() : undefined,
      password,
      role: role || 'EMPLOYEE',
      companyId: req.user.companyId,
      departmentId: departmentId || null,
      designation: designation || '',
      employeeStudentId: employeeStudentId || '',
      status: status || 'ACTIVE',
      profileImage: profileImage || req.body.avatar || '',
    });

    await newUser.save();

    await logAudit({
      admin: req.user,
      targetUser: newUser,
      action: 'USER_CREATED',
      description: `Created user ${newUser.name} with role ${newUser.role}`,
      newValue: { name: newUser.name, role: newUser.role, email: newUser.email },
      req,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: newUser.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id - Edit User Details
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    });

    if (!user) {
      return next(new ApiError(404, 'User not found or unauthorized'));
    }

    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      alternatePhone,
      gender,
      dob,
      username,
      role,
      departmentId,
      designation,
      employeeStudentId,
      status,
      profileImage,
    } = req.body;

    if (email && email.toLowerCase().trim() !== user.email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingEmail) {
        return next(new ApiError(409, 'Email address is already in use.'));
      }
      user.email = email.toLowerCase().trim();
    }

    if (username && username.toLowerCase().trim() !== user.username) {
      const existingUsername = await User.findOne({ username: username.toLowerCase().trim() });
      if (existingUsername) {
        return next(new ApiError(409, 'Username is already in use.'));
      }
      user.username = username.toLowerCase().trim();
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (name || firstName || lastName) {
      user.name = name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    if (phone !== undefined) user.phone = phone;
    if (alternatePhone !== undefined) user.alternatePhone = alternatePhone;
    if (gender !== undefined) user.gender = gender;
    if (dob !== undefined) user.dob = dob;
    if (role !== undefined) user.role = role;
    if (departmentId !== undefined) user.departmentId = departmentId || null;
    if (designation !== undefined) user.designation = designation;
    if (employeeStudentId !== undefined) user.employeeStudentId = employeeStudentId;
    if (status !== undefined) user.status = status;
    if (profileImage !== undefined || req.body.avatar !== undefined) {
      user.profileImage = profileImage || req.body.avatar || '';
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/activate - Activate User
 */
const activateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    user.status = 'ACTIVE';
    user.suspendedAt = null;
    user.suspensionReason = '';
    user.suspensionEndDate = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} activated successfully`,
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/deactivate - Deactivate User
 */
const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    if (user._id.toString() === req.user._id.toString()) {
      return next(new ApiError(400, 'Self-deactivation is disabled for safety.'));
    }

    user.status = 'INACTIVE';
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} deactivated successfully`,
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/suspend - Suspend User
 */
const suspendUser = async (req, res, next) => {
  try {
    const { suspensionDays, reason } = req.body;
    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    if (user._id.toString() === req.user._id.toString()) {
      return next(new ApiError(400, 'Self-suspension is disabled for safety.'));
    }

    const endDate = suspensionDays ? new Date(Date.now() + parseInt(suspensionDays, 10) * 86400000) : null;

    user.status = 'SUSPENDED';
    user.suspendedAt = new Date();
    user.suspensionReason = reason || 'Administrative suspension';
    user.suspensionEndDate = endDate;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} suspended successfully`,
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/role - Change User Role
 */
const changeUserRole = async (req, res, next) => {
  try {
    const { role, reason } = req.body;
    if (!role) return next(new ApiError(400, 'New role code is required.'));

    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    if (user._id.toString() === req.user._id.toString()) {
      return next(new ApiError(400, 'Self-role change is disabled for safety.'));
    }

    user.role = role.toUpperCase().trim();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Role changed to ${user.role} for ${user.name}`,
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/department - Assign Department
 */
const assignDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.body;

    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    user.departmentId = departmentId || null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Department assignment updated',
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/reset-password - Reset Password
 */
const resetUserPassword = async (req, res, next) => {
  try {
    const { newPassword, mustChangePassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return next(new ApiError(400, 'New password must be at least 6 characters.'));
    }

    const user = await User.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!user) return next(new ApiError(404, 'User not found'));

    user.password = newPassword;
    if (mustChangePassword !== undefined) user.forcePasswordChange = Boolean(mustChangePassword);
    await user.save();

    res.status(200).json({
      success: true,
      message: `Password reset successfully for ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users/bulk-action - Execute Bulk Operations
 */
const bulkAction = async (req, res, next) => {
  try {
    const { action, userIds, options = {} } = req.body;

    if (!action || !Array.isArray(userIds) || userIds.length === 0) {
      return next(new ApiError(400, 'action and array of userIds are required.'));
    }

    const validUserIds = userIds.filter((id) => id.toString() !== req.user._id.toString());

    if (action === 'ACTIVATE') {
      await User.updateMany(
        { _id: { $in: validUserIds }, companyId: req.user.companyId },
        { $set: { status: 'ACTIVE', suspendedAt: null, suspensionReason: '' } }
      );
    } else if (action === 'DEACTIVATE') {
      await User.updateMany(
        { _id: { $in: validUserIds }, companyId: req.user.companyId },
        { $set: { status: 'INACTIVE' } }
      );
    } else if (action === 'SUSPEND') {
      const endDate = options.suspensionDays ? new Date(Date.now() + parseInt(options.suspensionDays, 10) * 86400000) : null;
      await User.updateMany(
        { _id: { $in: validUserIds }, companyId: req.user.companyId },
        {
          $set: {
            status: 'SUSPENDED',
            suspendedAt: new Date(),
            suspensionReason: options.reason || 'Bulk administrative suspension',
            suspensionEndDate: endDate,
          },
        }
      );
    } else if (action === 'CHANGE_ROLE') {
      if (!options.role) return next(new ApiError(400, 'role is required for bulk CHANGE_ROLE action'));
      await User.updateMany(
        { _id: { $in: validUserIds }, companyId: req.user.companyId },
        { $set: { role: options.role.toUpperCase().trim() } }
      );
    } else if (action === 'ASSIGN_DEPARTMENT') {
      await User.updateMany(
        { _id: { $in: validUserIds }, companyId: req.user.companyId },
        { $set: { departmentId: options.departmentId || null } }
      );
    } else {
      return next(new ApiError(400, `Unsupported bulk action: ${action}`));
    }

    res.status(200).json({
      success: true,
      message: `Bulk action "${action}" completed for ${validUserIds.length} users`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserStats,
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
  suspendUser,
  changeUserRole,
  assignDepartment,
  resetUserPassword,
  bulkAction,
};
