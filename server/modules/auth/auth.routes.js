const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.get('/refresh', protect, authController.refresh);

module.exports = router;
