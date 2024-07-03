const app = require("../js/app.js");
const bcrypt = require("bcryptjs");
const path = require('path');

exports.signup = async (req, res) => {
	console.log(req.body, typeof(req.body));

		// let hashedPassword = await bcrypt.hash(password, 8);
		let loginStatus = app.querySignUp([req.body['signup-name'], req.body['signup-age'], req.body['signup-gender'], req.body['signup-contact'], req.body['signup-email'], req.body['signup-username'], req.body['signup-password']], function (status) {
			console.log(status);
			if (status === true) {
				let userCreds = {"username": req.body['signin-username']};
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				res.status(200).json(userCreds);
				res.end();
			} else if (status === false) {
				res.end("Login Failed!");
			}
		});
};