const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/', cartController.createData);
router.delete('/', cartController.deleteData);
router.get('/', cartController.getData);

module.exports = router;