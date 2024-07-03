const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getData);
router.put('/', userController.putData);
router.post('/', userController.createData);

module.exports = router;