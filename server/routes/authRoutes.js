const express = require('express');
const { login, logout, getMe, refresh } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate(true), getMe); // allowPending=true so pending user can fetch profile/status
router.post('/refresh', authenticate(false), refresh);

module.exports = router;
