const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlist');

router.post('/', wishlistController.createData);
router.delete('/', wishlistController.deleteData);
// router.put('/', wishlistController.putData);

module.exports = router;
