const express = require('express');
const app = express();
const fs = require('fs');
// const http = require('http');
// const url = require('url');

// appendFile
app.get('/', function (req, res, next) {
	fs.appendFile('input.txt', '\nHello content!', function (err) {
	  if (err) throw err;
	}); 
	fs.readFile('input.txt', function(err, data) {
	  res.write(data);
	  res.end();
	});
	// res.send("hello world!");
});

// readFile
// app.get('/readFile', function (req, res, next) {
// 	fs.readFile('input.txt', function(err, data) {
// 	  // res.writeHead(200, {'Content-Type': 'text/html'});
// 	  res.write(data);
// 	  res.end();
// 	});
// 	// next();
// });



// Streams
// app.get('/', function (req, res) {
// 	var rstream = new fs.createReadStream('input.txt');
// 	rstream.on('data', (chunkdata) => {
// 		res.write(chunkdata);
// 	});
// 	rstream.on('end', () => {
// 		res.end();
// 	});
// });

app.listen(8080, function() {
	console.log('Server listening!');
}); 
