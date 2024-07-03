const express = require('express');
const imgController = require('../controllers/image');
const router = express.Router();

router.post('/image', imgController.uploadImage);

module.exports = router;