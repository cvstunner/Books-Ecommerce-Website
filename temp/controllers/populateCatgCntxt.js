const app = require("../js/app.js");
const path = require('path');

exports.populateCatgCntxt = async (req, res) => {
	let loginStatus = app.selectQuery("Select DISTINCT Category from products", null, function (status) {
		console.log(status);
		if (status !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			console.log(loginStatus);
			res.status(200).json(status);
		} else if (status === null) {
			res.send("Login Failed!");
		}
	});
};