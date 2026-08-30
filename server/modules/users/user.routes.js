const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const userController = require('./user.controller');

const router = express.Router();

// Apply Authentication middleware to all User Management routes
router.use(protect);

router.get('/stats', userController.getUserStats);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

router.patch('/:id/activate', userController.activateUser);
router.patch('/:id/deactivate', userController.deactivateUser);
router.patch('/:id/suspend', userController.suspendUser);
router.patch('/:id/role', userController.changeUserRole);
router.patch('/:id/department', userController.assignDepartment);
router.patch('/:id/reset-password', userController.resetUserPassword);

router.post('/bulk-action', userController.bulkAction);

module.exports = router;
