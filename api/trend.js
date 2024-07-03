const express = require('express');
const trendController = require('../controllers/trend');
const router = express.Router();

// router.post('/', trendController.getData);
router.get('/', trendController.getData);

module.exports = router;