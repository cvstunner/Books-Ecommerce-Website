const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
	res.send('File created!');
});

router.get('/', function(req, res) {
	res.send('File readed!');
});

router.put('/', function(req, res) {
	res.send('File updated!');
});

module.exports = router;