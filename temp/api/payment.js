const express = require('express');
const orderController = require('../controllers/order');
const router = express.Router();
const path = require('path');

router.post('/order', orderController.createOrder);
router.post('/verify', orderController.verifyOrder);

module.exports = router;