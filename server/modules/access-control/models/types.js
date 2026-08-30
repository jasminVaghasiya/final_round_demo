/**
 * Access Control System Enums & Types
 */

const ROLE = {
  SYSTEM_SUPER_ADMIN: 'SUPER_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  CREATOR: 'CREATOR',
  HOD: 'HOD',
  MANAGER: 'MANAGER',
  FACULTY: 'FACULTY',
  STAFF: 'STAFF',
  STUDENT: 'STUDENT',
  EMPLOYEE: 'EMPLOYEE',
  MEMBER: 'MEMBER',
};

const ACCESS = {
  PUBLIC: 'PUBLIC',
  PROTECTED: 'PROTECTED',
  PRIVATE: 'PRIVATE',
};

const SUBJECTS = {
  ALL: 'all',
  USER: 'User',
  COMPANY: 'Company',
  GROUP: 'Group',
  GROUP_MEMBER: 'GroupMember',
  MEMBER: 'Member',
  JOIN_REQUEST: 'JoinRequest',
  REQUEST: 'Request',
  DEPARTMENT: 'Department',
  COMPLAINT: 'Complaint',
  AUDIT_LOG: 'AuditLog',
};

const ACTIONS = {
  MANAGE: 'manage',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  REMOVE_MEMBER: 'removeMember',
  BLOCK: 'block',
  UNBLOCK: 'unblock',
  JOIN: 'join',
  REQUEST: 'request',
  APPROVE: 'approve',
  REJECT: 'reject',
  RESET_PASSWORD: 'resetPassword',
  SUSPEND: 'suspend',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  CHANGE_ROLE: 'changeRole',
  ASSIGN_DEPARTMENT: 'assignDepartment',
};

module.exports = {
  ROLE,
  ACCESS,
  SUBJECTS,
  ACTIONS,
};
