const { ROLE } = require('../models/types');
const Policy = require('./policy');

/**
 * User Governance Policy
 * Strictly enforces role-based and department-scoped authorization rules
 */
class UserPolicy extends Policy {
  /**
   * Helper check to verify if HOD is managing a user within their own department
   */
  isSameDepartment(user, targetUser) {
    const userDept = this.extractId(user?.departmentId);
    const targetDept = this.extractId(targetUser?.departmentId);
    return Boolean(userDept && targetDept && userDept === targetDept);
  }

  /**
   * Can user view target user profile?
   */
  canViewUser(user, targetUser) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (this.extractId(user) === this.extractId(targetUser)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only view employees within their assigned department');
    }
    if (this.extractId(user?.companyId) === this.extractId(targetUser?.companyId)) return this.allow();
    return this.deny('Not authorized to view this user profile');
  }

  /**
   * Can user edit target user details?
   */
  canEditUser(user, targetUser) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (this.extractId(user) === this.extractId(targetUser)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only edit employees within their assigned department');
    }
    return this.deny('Not authorized to edit this user details');
  }

  /**
   * Can user suspend target user account?
   */
  canSuspendUser(user, targetUser) {
    if (this.extractId(user) === this.extractId(targetUser)) {
      return this.deny('Administrators cannot suspend their own account');
    }
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only suspend employees within their assigned department');
    }
    return this.deny('Not authorized to suspend users');
  }

  /**
   * Can user deactivate target user account?
   */
  canDeactivateUser(user, targetUser) {
    if (this.extractId(user) === this.extractId(targetUser)) {
      return this.deny('Administrators cannot deactivate their own account');
    }
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only deactivate employees within their assigned department');
    }
    return this.deny('Not authorized to deactivate users');
  }

  /**
   * Can user activate target user account?
   */
  canActivateUser(user, targetUser) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only activate employees within their assigned department');
    }
    return this.deny('Not authorized to activate users');
  }

  /**
   * Can user change role of target user?
   */
  canChangeRole(user, targetUser, newRole) {
    if (this.extractId(user) === this.extractId(targetUser) && newRole !== user?.role) {
      return this.deny('Administrators cannot change their own primary role');
    }
    if (user?.role === ROLE.HOD) {
      if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(newRole)) {
        return this.deny('HOD users cannot grant administrative roles');
      }
      if (!this.isSameDepartment(user, targetUser)) {
        return this.deny('HOD can only change roles for employees within their assigned department');
      }
      return this.allow();
    }
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) {
      return this.allow();
    }
    return this.deny('Not authorized to change user role');
  }

  /**
   * Can user assign or change department of target user?
   * Rule: ONLY SUPER_ADMIN and ADMIN roles are allowed to assign or change departments.
   */
  canAssignDepartment(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) {
      return this.allow();
    }
    return this.deny('Only company administrators are allowed to assign or change user departments');
  }

  /**
   * Can user reset password of target user?
   */
  canResetPassword(user, targetUser) {
    if (this.extractId(user) === this.extractId(targetUser)) return this.allow();
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (user?.role === ROLE.HOD) {
      if (this.isSameDepartment(user, targetUser)) return this.allow();
      return this.deny('HOD can only reset passwords for employees within their assigned department');
    }
    return this.deny('Not authorized to reset password');
  }
}

module.exports = UserPolicy;
