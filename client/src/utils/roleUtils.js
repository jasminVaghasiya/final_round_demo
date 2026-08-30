/**
 * Role Governance Utility
 * Enforces role assignment boundaries based on the logged-in user's role:
 * 1. SUPER_ADMIN: Can assign ADMIN, HOD, MANAGER, EMPLOYEE.
 * 2. ADMIN: Cannot assign ADMIN to anyone else! Can assign HOD, MANAGER, EMPLOYEE.
 * 3. HOD: Cannot assign HOD or ADMIN to anyone else! Can assign MANAGER, EMPLOYEE.
 * 4. STANDARD/EMPLOYEE: Cannot assign privileged roles.
 */

export const ALL_SYSTEM_ROLES = [
  { code: 'ADMIN', name: 'Administrator (Admin)' },
  { code: 'HOD', name: 'Head of Department (HOD)' },
  { code: 'MANAGER', name: 'Manager' },
  { code: 'EMPLOYEE', name: 'Employee' },
];

export const getAssignableRoles = (currentUser) => {
  const userRole = currentUser?.role || 'EMPLOYEE';

  if (userRole === 'SUPER_ADMIN') {
    return ALL_SYSTEM_ROLES;
  }

  if (userRole === 'ADMIN') {
    // Admin cannot assign ADMIN to anyone!
    return ALL_SYSTEM_ROLES.filter((r) => r.code !== 'ADMIN');
  }

  if (userRole === 'HOD') {
    // HOD cannot assign ADMIN or HOD to anyone!
    return ALL_SYSTEM_ROLES.filter((r) => !['ADMIN', 'HOD'].includes(r.code));
  }

  // Standard users / Employees
  return ALL_SYSTEM_ROLES.filter((r) => r.code === 'EMPLOYEE');
};
