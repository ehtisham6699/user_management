const express = require('express');
const authController = require('../../controllers/v1/authController');
const router = express.Router();

const { registrationValidationRules, validate, loginValidationRules } = require('../../shared/utils/validator');
router.post('/register', registrationValidationRules(),validate,authController.register);
router.post('/login', loginValidationRules(),validate, authController.login);
router.post('/refreshToken', authController.refreshToken);
  
module.exports = router;

