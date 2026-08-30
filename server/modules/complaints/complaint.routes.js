const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const complaintController = require('./complaint.controller');

const router = express.Router();

// Apply Authentication middleware to all complaint endpoints
router.use(protect);

router.get('/', complaintController.getComplaints);
router.post('/', complaintController.createComplaint);
router.get('/:id', complaintController.getComplaintById);
router.put('/:id', complaintController.updateComplaint);
router.delete('/:id', complaintController.deleteComplaint);
router.patch('/:id/status', complaintController.updateStatus);

// Chat Message Endpoints
router.post('/:id/messages', complaintController.addMessage);
router.put('/:id/messages/:messageId', complaintController.editMessage);

module.exports = router;
