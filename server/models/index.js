const Company = require('../modules/companies/company.model');
const User = require('../modules/users/user.model');
const Department = require('../modules/departments/department.model');
const JoinRequest = require('../modules/join-requests/joinRequest.model');
const AuditLog = require('../modules/audit-logs/auditLog.model');
const Complaint = require('../modules/complaints/complaint.model');

module.exports = {
  Company,
  User,
  Department,
  JoinRequest,
  AuditLog,
  Complaint,
};
