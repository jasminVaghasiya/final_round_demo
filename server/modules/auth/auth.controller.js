const User = require('../users/user.model');
const { signToken } = require('../../utils/jwt');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * Modular Auth Controller
 * Handles Login, Logout, Profile (/me), and Refresh
 */

/**
 * User Login Controller
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Email and password are required.'));
    }

    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+password')
      .populate('companyId', 'name code isActive');

    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    // Enforce Account Status checks
    if (user.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Contact your administrator.',
        status: 'SUSPENDED',
      });
    }

    if (user.status === 'REJECTED') {
      return res.status(403).json({
        success: false,
        message: 'Your request to join the company was rejected.',
        status: 'REJECTED',
      });
    }

    if (user.status === 'PENDING') {
      const pendingToken = signToken({
        userId: user._id,
        companyId: user.companyId ? user.companyId._id : null,
        role: user.role,
      });

      return res.status(403).json({
        success: false,
        message: 'Your company join request is still pending.',
        status: 'PENDING',
        data: {
          token: pendingToken,
          user: user.toJSON(),
        },
      });
    }

    // ACTIVE status -> Issue JWT token
    const token = signToken({
      userId: user._id,
      companyId: user.companyId ? user.companyId._id : null,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout Controller
 */
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

/**
 * Get Current User Profile Controller
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate('companyId', 'name code email phone address city state country isActive')
      .populate('departmentId', 'name code');

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh Auth State / Token Controller
 */
const refresh = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('companyId', 'name code isActive');

    if (!user || user.status !== 'ACTIVE') {
      return next(new ApiError(401, 'User account is not active'));
    }

    const token = signToken({
      userId: user._id,
      companyId: user.companyId ? user.companyId._id : null,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getMe,
  refresh,
};
