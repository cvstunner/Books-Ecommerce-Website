const app     = require("../js/app.js");
const bcrypt  = require("bcryptjs");
const path    = require('path');
const session = require('express-session');
const imgController = require('../controllers/image');

exports.login = (req, res) => {
	console.log(req.body, typeof(req.body));
	let signInbtnClicked = Object.keys(req.body)[2];
	let signUpbtnClicked = Object.keys(req.body)[7];

	if(signInbtnClicked === "signin-btn"){
		let username = req.body['signin-username'];
		let password = req.body['signin-password'];
		let loginStatus = app.queryLogin([username, password], function (data) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			let response;
			console.log(data)
			if (data !== undefined && data !== null) {
				console.log('200', data);
				req.session.username = username;
				response = {"username": username, "userId": data[0], "status": data[1]};
				// imgController.setStorage(req.session.username);
				res.status(200).json(response);
			} 
			else if (data === undefined){
				console.log('404');
				response = {"username": undefined, "userId": undefined};
				res.status(404).json({});
			}
			else if (data === null){
				console.log('401');
				response = {"username": null, "userId": null};
				res.status(401).json(response);
			}
		});
	}	
	else if(signUpbtnClicked === "signup-btn"){
		let password = req.body['signup-password'];
		let hashedPassword;
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				if (err){
					return console.log('cannot encrypt!');
				}
				hashedPassword = hash;
				console.log("hash: ", hash, typeof(hash));

				let loginStatus = app.querySignUp([req.body['signup-name'], req.body['signup-age'], req.body['signup-gender'], req.body['signup-contact'], req.body['signup-email'], req.body['signup-username'], hashedPassword, req.body['signup-username']], function (data) {
					console.log(data);
					if (data !== undefined || data !== null) {
						let userCreds = {"username": req.body['signup-username'], "userId": data[0]};
						req.session.username = req.body['signup-username'];
						res.header('Acces-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', '*');
						res.status(200).json(userCreds);
					} 
					else if (data === undefined) {
						let userCreds = {"username": undefined, "userId": undefined};
						res.status(404).json(userCreds);
					}
				});
			});
		});
	}
};