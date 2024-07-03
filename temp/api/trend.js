const express = require('express');
const trendController = require('../controllers/trend');
const router = express.Router();
const path = require('path');

router.post('/trend', trendController.addTrend);
router.get('/trend', trendController.addTrend);

module.exports = router;