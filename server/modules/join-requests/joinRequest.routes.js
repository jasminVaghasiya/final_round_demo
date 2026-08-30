const express = require('express');
const {
  submitJoinRequest,
  getMyJoinRequest,
  getCompanyJoinRequests,
  getJoinRequestById,
  approveJoinRequest,
  rejectJoinRequest,
} = require('./joinRequest.controller');

const { authenticate } = require('../../middleware/authMiddleware');
const { requireCompany } = require('../../middleware/companyMiddleware');
const {
  attachAbility,
  policyGate,
  joinRequestPolicy,
  ACTIONS,
  SUBJECTS,
} = require('../access-control');

const router = express.Router();

router.post(
  '/',
  authenticate(true),
  attachAbility,
  policyGate(joinRequestPolicy, 'canSubmitJoinRequest', null, {
    action: ACTIONS.REQUEST,
    subjectName: SUBJECTS.JOIN_REQUEST,
    requireTarget: false,
  }),
  submitJoinRequest
);

router.get('/my', authenticate(true), getMyJoinRequest);

router.use('/admin', authenticate(false), requireCompany, attachAbility);

router.get(
  '/admin',
  policyGate(joinRequestPolicy, 'canViewJoinRequests', null, {
    action: ACTIONS.READ,
    subjectName: SUBJECTS.JOIN_REQUEST,
    requireTarget: false,
  }),
  getCompanyJoinRequests
);

router.get(
  '/admin/:id',
  policyGate(joinRequestPolicy, 'canViewJoinRequests', null, {
    action: ACTIONS.READ,
    subjectName: SUBJECTS.JOIN_REQUEST,
  }),
  getJoinRequestById
);

router.patch(
  '/admin/:id/approve',
  policyGate(joinRequestPolicy, 'canApproveJoinRequest', null, {
    action: ACTIONS.APPROVE,
    subjectName: SUBJECTS.JOIN_REQUEST,
  }),
  approveJoinRequest
);

router.patch(
  '/admin/:id/reject',
  policyGate(joinRequestPolicy, 'canRejectJoinRequest', null, {
    action: ACTIONS.REJECT,
    subjectName: SUBJECTS.JOIN_REQUEST,
  }),
  rejectJoinRequest
);

module.exports = router;
