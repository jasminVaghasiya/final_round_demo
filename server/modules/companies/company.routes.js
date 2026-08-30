const express = require('express');
const { registerCompany, getCompanyByCode } = require('./company.controller');
const { authenticate } = require('../../middleware/authMiddleware');
const {
  attachAbility,
  policyGate,
  companyPolicy,
  ACTIONS,
  SUBJECTS,
} = require('../access-control');

const router = express.Router();

// Company registration protected by CASL attachAbility and CompanyPolicy
router.post(
  '/register',
  authenticate(true),
  attachAbility,
  policyGate(companyPolicy, 'canCreateCompany', null, {
    action: ACTIONS.CREATE,
    subjectName: SUBJECTS.COMPANY,
    requireTarget: false,
  }),
  registerCompany
);

// Public company search by code
router.get('/code/:code', getCompanyByCode);

module.exports = router;
