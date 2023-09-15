
const express = require('express');
const userController = require('../../controllers/v1/userController');
const router = express.Router();
const passport = require('passport');

router.get('/list', userController.getAllUsers);
router.get('/',passport.authenticate('jwt', { session: false }), userController.getLoggedInUser); 

module.exports = router;

