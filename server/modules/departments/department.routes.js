const express = require('express');
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('./department.controller');

const { authenticate } = require('../../middleware/authMiddleware');
const { requireCompany } = require('../../middleware/companyMiddleware');
const {
  attachAbility,
  policyGate,
  departmentPolicy,
  ACTIONS,
  SUBJECTS,
} = require('../access-control');
const Department = require('./department.model');

const router = express.Router();

router.use(authenticate(false), requireCompany, attachAbility);

const loadDepartment = async (req) => {
  if (!req.params.id) return null;
  return Department.findOne({ _id: req.params.id, companyId: req.user.companyId });
};

// List departments: Allowed for all authenticated company members
router.get('/', getDepartments);

router.post(
  '/',
  policyGate(departmentPolicy, 'canCreateDepartment', null, {
    action: ACTIONS.CREATE,
    subjectName: SUBJECTS.DEPARTMENT,
    requireTarget: false,
  }),
  createDepartment
);

router.put(
  '/:id',
  policyGate(departmentPolicy, 'canUpdateDepartment', loadDepartment, {
    action: ACTIONS.UPDATE,
    subjectName: SUBJECTS.DEPARTMENT,
  }),
  updateDepartment
);

router.delete(
  '/:id',
  policyGate(departmentPolicy, 'canDeleteDepartment', loadDepartment, {
    action: ACTIONS.DELETE,
    subjectName: SUBJECTS.DEPARTMENT,
  }),
  deleteDepartment
);

module.exports = router;
