const { ROLE, ACCESS, SUBJECTS, ACTIONS } = require('./models/types');
const { defineAbilitiesFor } = require('./abilities/defineAbility');
const Policy = require('./policies/policy');
const CompanyPolicy = require('./policies/companyPolicy');
const UserPolicy = require('./policies/userPolicy');
const ComplaintPolicy = require('./policies/complaintPolicy');
const DepartmentPolicy = require('./policies/departmentPolicy');
const JoinRequestPolicy = require('./policies/joinRequestPolicy');

const attachAbility = require('./middlewares/attachAbility');
const policyGate = require('./middlewares/policyGate');

// Instantiate Policy Singletons
const companyPolicy = new CompanyPolicy();
const userPolicy = new UserPolicy();
const complaintPolicy = new ComplaintPolicy();
const departmentPolicy = new DepartmentPolicy();
const joinRequestPolicy = new JoinRequestPolicy();

module.exports = {
  ROLE,
  ACCESS,
  SUBJECTS,
  ACTIONS,
  defineAbilitiesFor,
  Policy,
  CompanyPolicy,
  UserPolicy,
  ComplaintPolicy,
  DepartmentPolicy,
  JoinRequestPolicy,
  companyPolicy,
  userPolicy,
  complaintPolicy,
  departmentPolicy,
  joinRequestPolicy,
  attachAbility,
  policyGate,
};
