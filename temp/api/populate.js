const express = require('express');
const popCatgCntxtController = require('../controllers/populateCatgCntxt');
const popProductsController = require('../controllers/populateProducts');
const router = express.Router();
const path = require('path');

router.post('/populateCatgCntxt', popCatgCntxtController.populateCatgCntxt);
router.post('/products', popProductsController.populateProducts);

module.exports = router; 