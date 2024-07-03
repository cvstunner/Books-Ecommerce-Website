const express = require('express');
const router = express.Router();


router.get('/readFile', function (req, res, next) {
	fs.readFile('input.txt', function(err, data) {
	  // res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(data);
	  res.end();
	});
	next();
});