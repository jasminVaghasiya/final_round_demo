const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/authMiddleware');
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getDynamicPolicies,
  createDynamicPolicy,
  togglePolicyPermission,
  deleteDynamicPolicy,
} = require('./role.controller');

router.use(authenticate());

const adminOnly = (req, res, next) => {
  if (!['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Only company administrators can manage roles and policies' });
  }
  next();
};

// Policy & Role Management Routes
router.get('/', getRoles);
router.post('/', adminOnly, createRole);
router.put('/:id', adminOnly, updateRole);
router.delete('/:id', adminOnly, deleteRole);

router.get('/policies', getDynamicPolicies);
router.post('/policies', adminOnly, createDynamicPolicy);
router.post('/policies/toggle', adminOnly, togglePolicyPermission);
router.delete('/policies/:id', adminOnly, deleteDynamicPolicy);

module.exports = router;
