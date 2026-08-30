const { AbilityBuilder, createMongoAbility } = require('@casl/ability');
const { ROLE, SUBJECTS, ACTIONS } = require('../models/types');

/**
 * Builds fine-grained CASL MongoAbility instance for a user context
 */
const defineAbilitiesFor = (user = {}) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  const userId = user.id ? user.id.toString() : user._id ? user._id.toString() : undefined;
  const companyId = user.companyId ? user.companyId.toString() : undefined;
  const departmentId = user.departmentId ? user.departmentId.toString() : undefined;

  switch (user.role) {
    case ROLE.SUPER_ADMIN:
    case ROLE.SYSTEM_SUPER_ADMIN:
      // Super Admin manages everything across all tenants
      can([ACTIONS.MANAGE], 'all');
      break;

    case ROLE.CREATOR:
      // Creator has full administrative control over created group / company resources
      can([ACTIONS.MANAGE], [
        SUBJECTS.COMPANY,
        SUBJECTS.GROUP,
        SUBJECTS.GROUP_MEMBER,
        SUBJECTS.MEMBER,
        SUBJECTS.USER,
        SUBJECTS.JOIN_REQUEST,
        SUBJECTS.DEPARTMENT,
        SUBJECTS.COMPLAINT,
      ]);
      break;

    case ROLE.ADMIN:
      // Admin manages company users, join requests, departments, complaints within their company
      can([ACTIONS.READ, ACTIONS.CREATE, ACTIONS.UPDATE], SUBJECTS.COMPANY, { companyId });
      can([ACTIONS.READ, ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.SUSPEND, ACTIONS.ACTIVATE, ACTIONS.DEACTIVATE, ACTIONS.CHANGE_ROLE, ACTIONS.ASSIGN_DEPARTMENT, ACTIONS.RESET_PASSWORD], SUBJECTS.USER, { companyId });
      can([ACTIONS.READ, ACTIONS.APPROVE, ACTIONS.REJECT], SUBJECTS.JOIN_REQUEST, { companyId });
      can([ACTIONS.MANAGE], SUBJECTS.DEPARTMENT, { companyId });
      can([ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE], SUBJECTS.COMPLAINT, { companyId });
      can([ACTIONS.UPDATE, ACTIONS.REMOVE_MEMBER, ACTIONS.READ, ACTIONS.BLOCK, ACTIONS.UNBLOCK], SUBJECTS.GROUP_MEMBER);
      break;

    case ROLE.HOD:
      // HOD manages users & complaints within their assigned department
      can([ACTIONS.READ], SUBJECTS.COMPANY, { companyId });
      can([ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.ASSIGN_DEPARTMENT], SUBJECTS.USER, { companyId, departmentId });
      can([ACTIONS.READ, ACTIONS.APPROVE, ACTIONS.REJECT], SUBJECTS.JOIN_REQUEST, { companyId });
      can([ACTIONS.READ, ACTIONS.UPDATE], SUBJECTS.COMPLAINT, { companyId, departmentId });
      // Cannot promote self or create Super Admin
      cannot([ACTIONS.CHANGE_ROLE], SUBJECTS.USER, { role: ROLE.SUPER_ADMIN });
      break;

    case ROLE.MEMBER:
    case ROLE.EMPLOYEE:
    case ROLE.FACULTY:
    case ROLE.STAFF:
    case ROLE.STUDENT:
      // Regular members can view public/company info, submit complaints, and view self profile
      can([ACTIONS.READ], SUBJECTS.COMPANY, { companyId });
      can([ACTIONS.READ, ACTIONS.UPDATE], SUBJECTS.USER, { _id: userId });
      can([ACTIONS.CREATE, ACTIONS.READ], SUBJECTS.COMPLAINT, { submittedBy: userId });
      break;

    default:
      // Unauthenticated / Anonymous users can search public companies and submit join requests
      can([ACTIONS.READ], SUBJECTS.COMPANY);
      can([ACTIONS.CREATE, ACTIONS.REQUEST], SUBJECTS.JOIN_REQUEST);
      break;
  }

  return build({
    detectSubjectType: (item) =>
      item
        ? item.__caslSubjectType__ ||
          item.__type ||
          item.constructor?.modelName ||
          item.constructor?.name
        : undefined,
  });
};

module.exports = {
  defineAbilitiesFor,
};
