const { Role, DynamicPolicy } = require('./role.model');

// Default initial roles seeded into MongoDB per company (fully editable & deletable)
const DEFAULT_INITIAL_ROLES = [
  { name: 'Administrator', code: 'ADMIN', description: 'Full system administration & governance rights', baseRole: 'ADMIN' },
  { name: 'Head of Department', code: 'HOD', description: 'Department supervisor and team manager', baseRole: 'HOD' },
  { name: 'Faculty Member', code: 'FACULTY', description: 'Academic and instructional staff', baseRole: 'FACULTY' },
  { name: 'Staff Member', code: 'STAFF', description: 'Operational and support staff member', baseRole: 'STAFF' },
  { name: 'Student', code: 'STUDENT', description: 'Enrolled student member', baseRole: 'STUDENT' },
  { name: 'Employee', code: 'EMPLOYEE', description: 'Standard organization team member', baseRole: 'EMPLOYEE' },
];

/**
 * GET /api/roles - Get all company roles from MongoDB (all custom and editable)
 */
const getRoles = async (req, res, next) => {
  try {
    let roles = await Role.find({ companyId: req.user.companyId }).sort({ createdAt: -1 });

    // Auto-seed initial company roles into MongoDB if database has no roles for company
    if (roles.length === 0) {
      const docsToInsert = DEFAULT_INITIAL_ROLES.map((r) => ({
        ...r,
        companyId: req.user.companyId,
      }));
      await Role.insertMany(docsToInsert);
      roles = await Role.find({ companyId: req.user.companyId }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      data: { roles },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/roles - Create custom role
 */
const createRole = async (req, res, next) => {
  try {
    const { name, code, description, baseRole } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Role name and code are required' });
    }

    const formattedCode = code.toUpperCase().trim();

    const existing = await Role.findOne({ companyId: req.user.companyId, code: formattedCode });
    if (existing) {
      return res.status(400).json({ success: false, message: `Role code "${formattedCode}" already exists` });
    }

    const role = await Role.create({
      companyId: req.user.companyId,
      name: name.trim(),
      code: formattedCode,
      description: description || '',
      baseRole: baseRole || formattedCode,
    });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: { role },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/roles/:id - Update custom role
 */
const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, code, description, baseRole, status } = req.body;

    const role = await Role.findOne({ _id: id, companyId: req.user.companyId });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    if (name) role.name = name.trim();
    if (code) role.code = code.toUpperCase().trim();
    if (description !== undefined) role.description = description;
    if (baseRole) role.baseRole = baseRole;
    if (status) role.status = status;

    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: { role },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/roles/:id - Delete custom role
 */
const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findOneAndDelete({ _id: id, companyId: req.user.companyId });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/roles/policies - List dynamic CASL policy rules
 */
const getDynamicPolicies = async (req, res, next) => {
  try {
    const policies = await DynamicPolicy.find({ companyId: req.user.companyId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { policies },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/roles/policies - Create dynamic CASL policy rule
 */
const createDynamicPolicy = async (req, res, next) => {
  try {
    const { policyName, roleCode, subject, action, effect, conditionScope, description } = req.body;

    if (!policyName || !roleCode || !subject || !action) {
      return res.status(400).json({ success: false, message: 'Policy name, target role code, subject, and action are required' });
    }

    const policy = await DynamicPolicy.create({
      companyId: req.user.companyId,
      policyName: policyName.trim(),
      roleCode: roleCode.toUpperCase().trim(),
      subject,
      action,
      effect: effect || 'ALLOW',
      conditionScope: conditionScope || 'SAME_DEPARTMENT',
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Dynamic policy rule created successfully',
      data: { policy },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/roles/policies/toggle - Toggle dynamic policy permission checkbox (ALLOW / DENY)
 */
const togglePolicyPermission = async (req, res, next) => {
  try {
    const { roleCode, subject, action, effect, conditionScope } = req.body;

    if (!roleCode || !subject || !action || !effect) {
      return res.status(400).json({ success: false, message: 'roleCode, subject, action, and effect are required' });
    }

    const formattedRoleCode = roleCode.toUpperCase().trim();
    const policyName = `${formattedRoleCode} ${action} ${subject} Permission`;

    let policy = await DynamicPolicy.findOne({
      companyId: req.user.companyId,
      roleCode: formattedRoleCode,
      subject,
      action,
    });

    if (policy) {
      policy.effect = effect;
      if (conditionScope) policy.conditionScope = conditionScope;
      await policy.save();
    } else {
      policy = await DynamicPolicy.create({
        companyId: req.user.companyId,
        policyName,
        roleCode: formattedRoleCode,
        subject,
        action,
        effect,
        conditionScope: conditionScope || 'SAME_DEPARTMENT',
      });
    }

    res.status(200).json({
      success: true,
      message: `Permission ${effect} updated for ${formattedRoleCode} on ${subject}:${action}`,
      data: { policy },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/roles/policies/:id - Delete dynamic CASL policy rule
 */
const deleteDynamicPolicy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const policy = await DynamicPolicy.findOneAndDelete({ _id: id, companyId: req.user.companyId });
    if (!policy) {
      return res.status(404).json({ success: false, message: 'Dynamic policy rule not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Dynamic policy rule deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getDynamicPolicies,
  createDynamicPolicy,
  togglePolicyPermission,
  deleteDynamicPolicy,
};
