const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/', orderController.createData);

module.exports = router;