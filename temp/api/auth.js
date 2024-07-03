const express = require('express');
const authController = require('../controllers/auth');
const signupController = require('../controllers/signup');
const router = express.Router();
const path = require('path');

router.post('/login', authController.login);
// router.get('/login', authController.login);
// router.delete('/login', authController.login);
// router.put('/login', authController.login);
// router.post('/signup', signupController.signup);

module.exports = router;