const Company = require('../models/Company');
const User = require('../models/User');
const generateCompanyCode = require('../utils/generateCompanyCode');
const { signToken } = require('../utils/jwt');
const { ApiError } = require('../middlewares/error.middleware');

/**
 * Register New Company + Automatically Create Company Admin (Rules 3, 8)
 * Compatible with all MongoDB setups (standalone, replica sets, Atlas)
 */
const registerCompany = async (req, res, next) => {
  let createdCompanyId = null;

  try {
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      city,
      state,
      country,
      adminName,
      adminEmail,
      adminPhone,
      adminPassword,
    } = req.body;

    // Validation
    if (!companyName || !companyEmail) {
      throw new ApiError(400, 'Company name and company email are required.');
    }

    if (!adminName || !adminEmail || !adminPassword) {
      throw new ApiError(400, 'Admin name, email, and password are required.');
    }

    if (adminPassword.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters long.');
    }

    // 1. Check for existing company name
    const existingCompany = await Company.findOne({
      name: new RegExp(`^${companyName.trim()}$`, 'i'),
    });
    if (existingCompany) {
      throw new ApiError(409, 'A company with this name already exists.');
    }

    // 2. Check for existing admin email
    const existingUser = await User.findOne({
      email: adminEmail.toLowerCase().trim(),
    });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email address already exists.');
    }

    // 3. Generate unique company code
    let code = generateCompanyCode(companyName);
    let codeExists = await Company.findOne({ code });
    let attempts = 0;
    while (codeExists && attempts < 5) {
      code = generateCompanyCode(companyName);
      codeExists = await Company.findOne({ code });
      attempts++;
    }

    // 4. Create & Save Company
    const company = new Company({
      name: companyName.trim(),
      code,
      email: companyEmail.toLowerCase().trim(),
      phone: companyPhone || '',
      address: companyAddress || '',
      city: city || '',
      state: state || '',
      country: country || '',
      isActive: true,
    });

    await company.save();
    createdCompanyId = company._id;

    // 5. Create & Save Admin User (Force role ADMIN, status ACTIVE)
    const adminUser = new User({
      name: adminName.trim(),
      email: adminEmail.toLowerCase().trim(),
      password: adminPassword,
      phone: adminPhone || '',
      role: 'ADMIN', // Rule 3 & 8: Force ADMIN role on backend
      companyId: company._id,
      status: 'ACTIVE',
    });

    await adminUser.save();

    // 6. Set createdBy on company
    company.createdBy = adminUser._id;
    await company.save();

    // 7. Issue JWT Token for new Admin
    const token = signToken({
      userId: adminUser._id,
      companyId: company._id,
      role: 'ADMIN',
    });

    res.status(201).json({
      success: true,
      message: 'Company and Admin account created successfully',
      data: {
        company,
        user: adminUser.toJSON(),
        token,
      },
    });
  } catch (error) {
    // Rollback company document if admin creation failed mid-way
    if (createdCompanyId) {
      await Company.deleteOne({ _id: createdCompanyId }).catch(() => {});
    }
    next(error);
  }
};

/**
 * Find Public Company Information by Company Code
 */
const getCompanyByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    if (!code) {
      return next(new ApiError(400, 'Company code is required'));
    }

    const company = await Company.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
    }).select('_id name code city state country');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company code is invalid or company is unavailable.',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        company: {
          _id: company._id,
          name: company.name,
          code: company.code,
          city: company.city,
          state: company.state,
          country: company.country,
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
