const express = require('express');
const { registerCompany, getCompanyByCode } = require('../controllers/companyController');

const router = express.Router();

router.post('/register', registerCompany);
router.get('/code/:code', getCompanyByCode);

module.exports = router;
