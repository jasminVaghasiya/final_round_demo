const express = require('express');
const {
  submitJoinRequest,
  getMyJoinRequest,
  getCompanyJoinRequests,
  getJoinRequestById,
  approveJoinRequest,
  rejectJoinRequest,
} = require('../controllers/joinRequestController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { requireCompany } = require('../middleware/companyMiddleware');

const router = express.Router();

// Applicant endpoints
router.post('/', submitJoinRequest);
router.get('/my', authenticate(true), getMyJoinRequest);

// Admin join request management endpoints (Rule 12: Backend authorization enforcement)
router.get(
  '/admin',
  authenticate(false),
  authorize('ADMIN'),
  requireCompany,
  getCompanyJoinRequests
);

router.get(
  '/admin/:id',
  authenticate(false),
  authorize('ADMIN'),
  requireCompany,
  getJoinRequestById
);

router.patch(
  '/admin/:id/approve',
  authenticate(false),
  authorize('ADMIN'),
  requireCompany,
  approveJoinRequest
);

router.patch(
  '/admin/:id/reject',
  authenticate(false),
  authorize('ADMIN'),
  requireCompany,
  rejectJoinRequest
);

module.exports = router;
