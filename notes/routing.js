const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send("Welcome to Homepage!");
});

app.use("/fs", require('./routes.js'));

app.listen(8080, function() {
	console.log('Server listening!');
}); 
