const { ROLE } = require('../models/types');
const Policy = require('./policy');

/**
 * Complaint & Support Ticket Policy Layer
 * Implements fine-grained access rules for complaint submission, department scoping, assignment, and status updates
 */
class ComplaintPolicy extends Policy {
  /**
   * Can user submit a new complaint?
   * Rule: Any active user in the company can submit a complaint
   */
  canSubmitComplaint(user) {
    if (!user || (!user._id && !user.id)) {
      return this.deny('Must be logged in to submit a complaint');
    }
    if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
      return this.deny('Suspended or inactive users cannot submit new complaints');
    }
    return this.allow();
  }

  /**
   * Can user view complaint details?
   * Rules:
   *  - Submitter can view self complaints
   *  - Assigned Officer can view
   *  - HOD can view department complaints
   *  - Admin & Super Admin can view all company complaints
   */
  canViewComplaint(user, complaint) {
    const userId = this.extractId(user);
    if (user?.role === ROLE.SUPER_ADMIN || user?.role === ROLE.ADMIN) {
      return this.allow();
    }
    if (this.extractId(complaint?.submittedBy) === userId) {
      return this.allow();
    }
    if (this.extractId(complaint?.assignedTo) === userId) {
      return this.allow();
    }
    if (user?.role === ROLE.HOD && this.extractId(user?.departmentId) === this.extractId(complaint?.departmentId)) {
      return this.allow();
    }
    return this.deny('Not authorized to view this complaint');
  }

  /**
   * Can user update complaint status or reassign officer?
   * Rules:
   *  - Admin & Super Admin can update all
   *  - Department HOD can update department complaints
   *  - Assigned Officer can update status & append comments
   */
  canUpdateComplaint(user, complaint) {
    const userId = this.extractId(user);
    if (user?.role === ROLE.SUPER_ADMIN || user?.role === ROLE.ADMIN) {
      return this.allow();
    }
    if (user?.role === ROLE.HOD && this.extractId(user?.departmentId) === this.extractId(complaint?.departmentId)) {
      return this.allow();
    }
    if (this.extractId(complaint?.assignedTo) === userId) {
      return this.allow();
    }
    return this.deny('Not authorized to update this complaint');
  }

  /**
   * Can user delete complaint?
   * Rule: Admin & Super Admin only
   */
  canDeleteComplaint(user) {
    if (user?.role === ROLE.SUPER_ADMIN || user?.role === ROLE.ADMIN) {
      return this.allow();
    }
    return this.deny('Only company administrators can delete complaints');
  }
}

module.exports = ComplaintPolicy;
