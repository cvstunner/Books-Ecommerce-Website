const express = require('express');
const router  = express.Router();
const productController = require('../controllers/product');

// router.post('/trend', trendController.addTrend);
router.get('/', productController.getData);

module.exports = router;