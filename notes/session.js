const express = require('express');
const app = express();
// const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
	secret: 'secret_key',
	resave: true
}));

const userCreds = {
	id: 1,
	username: 'chetan',
	password: 'pswd'
}

app.get('/', function (req, res) {
	res.send('Welcome to Homepage');
});

app.get('/login', function (req, res) {
	req.session.user = userCreds;
	console.log(req.session.user);
	res.send('User loged in!');
});

app.get('/logout', function (req, res) {
	req.session.destroy();
	console.log(req.session);
	res.send('User loged out!');
});

app.listen(8090, function() {
	console.log('Server listening!');
}); 