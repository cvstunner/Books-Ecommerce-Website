const express = require('express');
const router  = express.Router();
const popCatgCntxtController = require('../controllers/catgCntxt');
const popProductsController  = require('../controllers/populateProducts');

router.get('/catgCntxt', popCatgCntxtController.populateCatgCntxt);
router.post('/products', popProductsController.populateProducts);

module.exports = router; 