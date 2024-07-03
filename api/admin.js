const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.post('/trend', adminController.addTrend);
router.get('/trend', adminController.getData);

module.exports = router;