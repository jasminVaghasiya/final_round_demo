const { ROLE, ACCESS } = require('../models/types');
const Policy = require('./policy');

/**
 * Multi-Tenant Company & Governance Policy
 * Implements authorization rules tailored for HelpDesk+ Organizations
 */
class CompanyPolicy extends Policy {
  /**
   * Can user create a new company?
   * Rule: Any logged-in user can create a company and automatically becomes Admin/Owner
   */
  canCreateCompany(user) {
    if (!user || (!user._id && !user.id)) {
      return this.deny('Must be logged in to create an organization');
    }
    return this.allow();
  }

  /**
   * Can user view company details?
   * Rule:
   *  - PUBLIC / PROTECTED: Visible in company directory
   *  - PRIVATE: Restricted to active organization members and administrators
   */
  canGetCompanyDetails(user, company) {
    if (this.isPublic(company) || this.isProtected(company)) {
      return this.allow();
    }
    if (this.isUserBlocked(user)) {
      return this.deny('User account is suspended or inactive');
    }
    if (this.isCompanyMember(user, company)) {
      return this.allow();
    }
    return this.deny('Private company details are restricted to organization members only');
  }

  /**
   * Can user update company settings & branding?
   * Rule: Company Creator/Owner or Active Admin. Blocked/Suspended Admin CANNOT update.
   */
  canUpdateCompanyDetails(user, company) {
    if (this.isCreator(user, company)) {
      return this.allow();
    }
    if (this.isAdmin(user, company)) {
      if (this.isUserBlocked(user)) {
        return this.deny('Suspended or inactive admin cannot update company settings');
      }
      return this.allow();
    }
    return this.deny('Not authorized to update company settings');
  }

  /**
   * Can a user join the company directly?
   * Rule:
   *  - PUBLIC: Anybody can join directly
   *  - PROTECTED: Join request required -> Admin + Creator approve
   *  - PRIVATE: Self-join denied (creator/admin must add directly)
   */
  canJoinCompany(user, company) {
    if (this.isUserBlocked(user)) {
      return this.deny('User account is suspended or inactive');
    }
    if (this.isCompanyMember(user, company)) {
      return this.deny('User is already a member of this company');
    }
    if (this.isPublic(company)) {
      return this.allow();
    }
    if (this.isProtected(company)) {
      return this.deny('Protected company requires join request approval');
    }
    return this.deny('Cannot self-join private company');
  }

  /**
   * Can a user request to join a protected company?
   * Rule: Protected companies only
   */
  canRequestJoin(user, company) {
    if (this.isUserBlocked(user)) {
      return this.deny('User account is suspended or inactive');
    }
    if (this.isCompanyMember(user, company)) {
      return this.deny('Already a member of this company');
    }
    if (this.isProtected(company)) {
      return this.allow();
    }
    return this.deny('Join requests apply to protected companies only');
  }

  /**
   * Can administrator approve or reject company join requests?
   * Rule: Company Creator or Active Admin
   */
  canRespondToRequest(user, company) {
    if (this.isCreator(user, company)) {
      return this.allow();
    }
    if (this.isAdmin(user, company) && !this.isUserBlocked(user)) {
      return this.allow();
    }
    return this.deny('Not authorized to respond to join requests');
  }

  /**
   * Can administrator add a member directly?
   * Rule: Admin or Creator only
   */
  canAddMember(user, company, targetUser) {
    if (this.isUserBlocked(targetUser)) {
      return this.deny('Target user is blocked or suspended');
    }
    if (this.isCompanyMember(targetUser, company)) {
      return this.deny('Target user is already in company');
    }
    if (this.isCreator(user, company)) {
      return this.allow();
    }
    if (this.isAdmin(user, company) && !this.isUserBlocked(user)) {
      return this.allow();
    }
    return this.deny('Not authorized to add members to company');
  }

  /**
   * Can administrator remove a user from company?
   * Rule: Admin or Creator only.
   * Safeguards:
   *  - Admin CANNOT remove Company Creator/Owner
   *  - Blocked admin CANNOT remove any user
   *  - Admin CANNOT remove another Admin
   */
  canRemoveMember(user, company, targetUser) {
    if (this.isCreator(targetUser, company)) {
      return this.deny('Admin cannot remove company creator/owner');
    }
    if (this.isCreator(user, company)) {
      return this.allow();
    }
    if (this.isAdmin(user, company)) {
      if (this.isUserBlocked(user)) {
        return this.deny('Blocked or suspended admin cannot remove users');
      }
      if (targetUser?.role === ROLE.ADMIN || targetUser?.role === ROLE.SUPER_ADMIN) {
        return this.deny('Admin cannot remove another administrator');
      }
      return this.allow();
    }
    return this.deny('Not authorized to remove user from company');
  }

  /**
   * Can administrator suspend/block a user?
   * Safeguards:
   *  - Cannot block company creator
   *  - Blocked admin cannot block users
   *  - Admin cannot block another admin
   */
  canBlockUser(user, company, targetUser) {
    if (this.isCreator(targetUser, company)) {
      return this.deny('Cannot suspend or block company creator');
    }
    if (this.isUserBlocked(targetUser)) {
      return this.deny('User is already suspended or inactive');
    }
    if (this.isCreator(user, company)) {
      return this.allow();
    }
    if (this.isAdmin(user, company)) {
      if (this.isUserBlocked(user)) {
        return this.deny('Blocked admin cannot suspend users');
      }
      if (targetUser?.role === ROLE.ADMIN || targetUser?.role === ROLE.SUPER_ADMIN) {
        return this.deny('Admin cannot suspend another administrator');
      }
      return this.allow();
    }
    return this.deny('Not authorized to suspend user');
  }

  /**
   * Can administrator delete company?
   * Rule: Only Company Creator or System Super Admin
   */
  canDeleteCompany(user, company) {
    if (this.isCreator(user, company) || user?.role === ROLE.SUPER_ADMIN) {
      return this.allow();
    }
    return this.deny('Only company creator or super admin can delete this company');
  }
}

module.exports = CompanyPolicy;
