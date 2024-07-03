const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/order', paymentController.createOrder);
router.post('/verify', paymentController.verifyOrder);

module.exports = router;