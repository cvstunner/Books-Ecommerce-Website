const express = require('express');
const sellProductController = require('../controllers/sellProduct');
const router = express.Router();
const path = require('path');

router.post('/product', sellProductController.sellProduct);
// router.post('/signup', signupController.signup);

module.exports = router;