const Department = require('./department.model');
const User = require('../users/user.model');
const AuditLog = require('../audit-logs/auditLog.model');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * GET /api/departments - List all departments for company with user counts
 */
const getDepartments = async (req, res, next) => {
  try {
    let departments = await Department.find({ companyId: req.user.companyId }).sort({ name: 1 });

    // If company has no departments created yet, automatically seed standard departments
    if (departments.length === 0 && req.user.companyId) {
      const defaultDepts = [
        { name: 'Information Technology', code: 'IT', description: 'Technical, IT infrastructure & software support', companyId: req.user.companyId },
        { name: 'Human Resources', code: 'HR', description: 'HR queries, payroll & staff management', companyId: req.user.companyId },
        { name: 'Administration', code: 'ADMIN', description: 'General administration & operations', companyId: req.user.companyId },
        { name: 'Academic & Curriculum', code: 'ACAD', description: 'Academic courses & curriculum queries', companyId: req.user.companyId },
        { name: 'Facility & Maintenance', code: 'MAINT', description: 'Equipment & physical facility maintenance', companyId: req.user.companyId },
      ];
      try {
        await Department.insertMany(defaultDepts, { ordered: false });
        departments = await Department.find({ companyId: req.user.companyId }).sort({ name: 1 });
      } catch (insertErr) {
        console.log('[Department] Default insert notice:', insertErr.message);
      }
    }

    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const userCount = await User.countDocuments({
          companyId: req.user.companyId,
          departmentId: dept._id,
        });
        return {
          ...dept.toObject(),
          userCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        departments: departmentsWithCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/departments - Create New Department
 */
const createDepartment = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !name.trim()) {
      return next(new ApiError(400, 'Department name is required.'));
    }

    const deptCode = (code || name.substring(0, 4)).toUpperCase().trim();

    const existing = await Department.findOne({
      companyId: req.user.companyId,
      $or: [{ name: name.trim() }, { code: deptCode }],
    });

    if (existing) {
      return next(new ApiError(409, 'A department with this name or code already exists in your company.'));
    }

    const department = new Department({
      name: name.trim(),
      code: deptCode,
      description: description ? description.trim() : '',
      companyId: req.user.companyId,
    });

    await department.save();

    await AuditLog.create({
      adminId: req.user._id,
      adminName: req.user.name,
      companyId: req.user.companyId,
      targetUserId: req.user._id,
      targetUserName: req.user.name,
      action: 'DEPARTMENT_CREATED',
      description: `Created department '${department.name}' (${department.code})`,
      newValue: { name: department.name, code: department.code },
      ipAddress: req.ip || '127.0.0.1',
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: {
        department,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/departments/:id - Update / Edit & Save Department
 */
const updateDepartment = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;

    const department = await Department.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    });

    if (!department) {
      return next(new ApiError(404, 'Department not found or unauthorized'));
    }

    const previousValue = { name: department.name, code: department.code, description: department.description };

    if (name) department.name = name.trim();
    if (code) department.code = code.toUpperCase().trim();
    if (description !== undefined) department.description = description.trim();

    await department.save();

    await AuditLog.create({
      adminId: req.user._id,
      adminName: req.user.name,
      companyId: req.user.companyId,
      targetUserId: req.user._id,
      targetUserName: req.user.name,
      action: 'DEPARTMENT_UPDATED',
      description: `Updated department details for '${department.name}'`,
      previousValue,
      newValue: { name: department.name, code: department.code, description: department.description },
      ipAddress: req.ip || '127.0.0.1',
    });

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: {
        department,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/departments/:id - Delete Department
 */
const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findOne({
      _id: req.params.id,
      companyId: req.user.companyId,
    });

    if (!department) {
      return next(new ApiError(404, 'Department not found or unauthorized'));
    }

    const assignedUsersCount = await User.countDocuments({
      companyId: req.user.companyId,
      departmentId: department._id,
    });

    if (assignedUsersCount > 0) {
      return next(
        new ApiError(
          400,
          `Cannot delete department '${department.name}' because ${assignedUsersCount} user(s) are assigned to it. Please reassign them first.`
        )
      );
    }

    await Department.deleteOne({ _id: department._id });

    await AuditLog.create({
      adminId: req.user._id,
      adminName: req.user.name,
      companyId: req.user.companyId,
      targetUserId: req.user._id,
      targetUserName: req.user.name,
      action: 'DEPARTMENT_DELETED',
      description: `Deleted department '${department.name}' (${department.code})`,
      previousValue: { name: department.name, code: department.code },
      ipAddress: req.ip || '127.0.0.1',
    });

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
