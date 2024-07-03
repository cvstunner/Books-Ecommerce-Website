const express = require('express');
const queryController = require('../controllers/queryMe');
const trendController = require('../controllers/trend');
const router = express.Router();
const path = require('path');

router.post('/seller', queryController.queryMe);
router.post('/prodet', queryController.queryMe);
router.post('/sellerdet', queryController.queryMe);
router.post('/createAddress', queryController.queryMe);
router.post('/getAddressId', queryController.queryMe);
router.post('/createOrder', queryController.queryMe);
router.post('/orders', queryController.queryMe);
router.post('/addCart', queryController.queryMe);
router.post('/addWishlist', queryController.queryMe);
router.post('/updateProQuantity', queryController.queryMe);
router.post('/trend', trendController.addTrend);
// router.get('/trend', trendController.addTrend);
router.post('/userDet', queryController.queryMe);

module.exports = router;