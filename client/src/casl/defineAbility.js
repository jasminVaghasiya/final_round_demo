import { AbilityBuilder, createMongoAbility } from '@casl/ability';

/**
 * Define Frontend CASL Abilities based on logged-in user role & department
 */
export function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user) {
    return build();
  }

  const role = user.role || 'EMPLOYEE';
  const userId = user._id || user.id;
  const userDeptId = user.departmentId?._id || user.departmentId || null;

  // HR Department Access Rule Helper
  const deptObj = user.departmentId;
  const deptCode = (deptObj && typeof deptObj === 'object' && deptObj.code) ? String(deptObj.code).toUpperCase() : '';
  const deptName = (deptObj && typeof deptObj === 'object' && deptObj.name) ? String(deptObj.name).toLowerCase() : '';
  const isHrPersonnel = deptCode === 'HR' || deptName.includes('hr') || deptName.includes('human resource');

  // 1. SUPER_ADMIN & ADMIN: Full Management Rights
  if (['SUPER_ADMIN', 'ADMIN'].includes(role)) {
    can('manage', 'all');
    can('assign_department', 'User');
    can('manage', 'Department');
    can('read', 'JoinRequest');
    can('approve', 'JoinRequest');
    can('reject', 'JoinRequest');
  } 
  // 2. HOD (Head of Department): Department-Scoped Management Rights
  else if (role === 'HOD') {
    can('read', 'User');

    // HOD can manage users within their own department ONLY
    if (userDeptId) {
      can('edit', 'User', { departmentId: userDeptId });
      can('suspend', 'User', { departmentId: userDeptId });
      can('deactivate', 'User', { departmentId: userDeptId });
      can('activate', 'User', { departmentId: userDeptId });
      can('change_role', 'User', { departmentId: userDeptId });
      can('reset_password', 'User', { departmentId: userDeptId });
    }

    // Explicit Rule: ONLY Admin can assign/change department!
    cannot('assign_department', 'User');
    cannot('manage', 'Department');

    // Join Requests: Allowed ONLY if HOD is in HR Department
    if (isHrPersonnel) {
      can('read', 'JoinRequest');
      can('approve', 'JoinRequest');
      can('reject', 'JoinRequest');
    } else {
      cannot('read', 'JoinRequest');
    }
  } 
  // 3. Regular Employees / Faculty / Staff / Students
  else {
    can('read', 'User', { _id: userId });
    can('edit', 'User', { _id: userId });

    cannot('assign_department', 'User');
    cannot('manage', 'Department');

    // Join Requests: Allowed if HR Department Personnel
    if (isHrPersonnel) {
      can('read', 'JoinRequest');
      can('approve', 'JoinRequest');
      can('reject', 'JoinRequest');
    } else {
      cannot('read', 'JoinRequest');
    }
  }

  // Universal Restriction: Users cannot suspend or deactivate their own active account
  if (userId) {
    cannot('suspend', 'User', { _id: userId });
    cannot('deactivate', 'User', { _id: userId });
  }

  return build();
}
