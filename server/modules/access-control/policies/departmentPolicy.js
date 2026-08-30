const { ROLE } = require('../models/types');
const Policy = require('./policy');

/**
 * Department Authorization Policy Layer
 */
class DepartmentPolicy extends Policy {
  /**
   * Can user view department information?
   * Rule: All company members can view company departments
   */
  canViewDepartment(user, department) {
    if (user?.role === ROLE.SUPER_ADMIN || user?.role === ROLE.ADMIN) return this.allow();
    if (!department) return this.allow();
    if (this.extractId(user?.companyId) === this.extractId(department?.companyId)) return this.allow();
    return this.deny('Not authorized to view this department');
  }

  /**
   * Can user create a new department?
   * Rule: Admin & Super Admin only
   */
  canCreateDepartment(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) {
      return this.allow();
    }
    return this.deny('Only company administrators can create departments');
  }

  /**
   * Can user update department details?
   * Rule: Admin & Super Admin or assigned Department HOD
   */
  canUpdateDepartment(user, department) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) return this.allow();
    if (user?.role === ROLE.HOD && this.extractId(user?.departmentId) === this.extractId(department)) {
      return this.allow();
    }
    return this.deny('Not authorized to update this department');
  }

  /**
   * Can user delete a department?
   * Rule: Admin & Super Admin only
   */
  canDeleteDepartment(user) {
    if ([ROLE.SUPER_ADMIN, ROLE.ADMIN].includes(user?.role)) {
      return this.allow();
    }
    return this.deny('Only company administrators can delete departments');
  }
}

module.exports = DepartmentPolicy;
