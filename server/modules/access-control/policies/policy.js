const { ROLE, ACCESS } = require('../models/types');

/**
 * Base Policy Class for HelpDesk+ Authorization Layer
 */
class Policy {
  /**
   * Safely extracts string representation of an ID from string, ObjectId, or object with _id/id/user.
   */
  extractId(entity) {
    if (!entity) return null;
    if (typeof entity === 'string') return entity.toString();
    if (entity.payload?.user) return entity.payload.user.toString();
    if (entity.user) return entity.user.toString();
    if (entity._id) return entity._id.toString();
    if (entity.id) return entity.id.toString();
    if (typeof entity.toString === 'function') return entity.toString();
    return null;
  }

  /**
   * Return standard policy allow response
   */
  allow() {
    return { state: true };
  }

  /**
   * Return standard policy deny response
   */
  deny(reason = 'Access denied') {
    return { state: false, reason };
  }

  /**
   * Checks if user is the entity creator / owner
   */
  isCreator(user, company) {
    const userId = this.extractId(user);
    const creatorId = this.extractId(company?.createdBy || company?.ownerId);
    if (!userId || !creatorId) return false;
    return creatorId === userId;
  }

  /**
   * Checks if user is an administrator in the company
   */
  isAdmin(user, company) {
    if (this.isCreator(user, company)) return true;
    return user?.role === ROLE.ADMIN || user?.role === ROLE.SUPER_ADMIN;
  }

  /**
   * Checks if user is a member of the company
   */
  isCompanyMember(user, company) {
    const userId = this.extractId(user);
    const userCompanyId = this.extractId(user?.companyId);
    const companyId = this.extractId(company);
    if (this.isCreator(user, company)) return true;
    if (!userCompanyId || !companyId) return false;
    return userCompanyId === companyId;
  }

  /**
   * Checks if user account is explicitly suspended, inactive, or blocked
   */
  isUserBlocked(user) {
    return user?.status === 'SUSPENDED' || user?.status === 'INACTIVE' || user?.isBlocked === true;
  }

  isPublic(company) {
    return company?.visibility === ACCESS.PUBLIC || company?.access === ACCESS.PUBLIC;
  }

  isPrivate(company) {
    return company?.visibility === ACCESS.PRIVATE || company?.access === ACCESS.PRIVATE;
  }

  isProtected(company) {
    return company?.visibility === ACCESS.PROTECTED || company?.access === ACCESS.PROTECTED;
  }
}

module.exports = Policy;
