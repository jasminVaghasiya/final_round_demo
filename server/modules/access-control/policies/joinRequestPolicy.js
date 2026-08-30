const { ROLE } = require('../models/types');
const Policy = require('./policy');

/**
 * Join Request Authorization Policy Layer
 * Restricts onboarding join request access to Administrators and HR Department personnel only
 */
class JoinRequestPolicy extends Policy {
  /**
   * Helper check to verify if user belongs to the HR Department
   */
  isHrPersonnel(user) {
    if (!user || !user.departmentId) return false;
    const deptObj = user.departmentId;
    const deptCode = typeof deptObj === 'object' ? (deptObj.code || '').toUpperCase() : '';
    const deptName = typeof deptObj === 'object' ? (deptObj.name || '').toLowerCase() : '';
    return deptCode === 'HR' || deptName.includes('hr') || deptName.includes('human resource');
  }

  /**
   * Can user submit a request to join a company?
   * Rule: Any user without an active company assignment
   */
  canSubmitJoinRequest(user) {
    if (!user || (!user._id && !user.id)) {
      return this.deny('Must be logged in to submit a join request');
    }
    if (user.companyId && user.status === 'ACTIVE') {
      return this.deny('User is already an active member of an organization');
    }
    return this.allow();
  }

  /**
   * Can user view company join requests?
   * Rule: Admin, Super Admin, Creator, or HR Department Personnel ONLY
   */
  canViewJoinRequests(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.CREATOR].includes(user?.role)) {
      return this.allow();
    }
    if (this.isHrPersonnel(user)) {
      return this.allow();
    }
    return this.deny('Company join requests are restricted to Administrators and HR Department personnel only');
  }

  /**
   * Can user approve join request?
   * Rule: Admin, Super Admin, Creator, or HR Department Personnel ONLY
   */
  canApproveJoinRequest(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.CREATOR].includes(user?.role)) {
      return this.allow();
    }
    if (this.isHrPersonnel(user)) {
      return this.allow();
    }
    return this.deny('Only Administrators and HR Department personnel can approve join requests');
  }

  /**
   * Can user reject join request?
   * Rule: Admin, Super Admin, Creator, or HR Department Personnel ONLY
   */
  canRejectJoinRequest(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.CREATOR].includes(user?.role)) {
      return this.allow();
    }
    if (this.isHrPersonnel(user)) {
      return this.allow();
    }
    return this.deny('Only Administrators and HR Department personnel can reject join requests');
  }
}

module.exports = JoinRequestPolicy;
