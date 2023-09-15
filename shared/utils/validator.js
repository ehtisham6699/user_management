const { body, validationResult, check } = require('express-validator');
const responseHandler = require('./responseHandler');


const registrationValidationRules = () => {
  return [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('birthDate').isISO8601().toDate().withMessage('Invalid date format'),
  ];
};

const loginValidationRules = () => {
    return [
      check('email').isEmail().withMessage('Invalid email address'),
    ];
  };

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return responseHandler.fail(res,"Validation Errors",errors.errors)
  }

  next();
};

module.exports = {
  registrationValidationRules,
  loginValidationRules,
  validate,
};
