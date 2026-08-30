const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const User = require('../users/user.model');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * Generate JWT token for authenticated user
 * @param {string} userId 
 * @returns {string} JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

/**
 * Register a new user
 */
const registerUser = async (userBody) => {
  const existingUser = await User.findOne({ email: userBody.email });
  if (existingUser) {
    throw new ApiError(400, 'Email address is already registered');
  }

  const user = await User.create(userBody);
  const token = generateToken(user._id);

  return { user, token };
};

/**
 * Authenticate user credentials and return JWT token
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Account is inactive. Please contact support.');
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};
