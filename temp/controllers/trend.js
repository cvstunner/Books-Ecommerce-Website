const app = require("../js/app.js");
const path = require('path');

exports.addTrend = async (req, res) => {
	app.selectQuery(req.body.query, req.body.values, function (status) {
		console.log(status);
		if (status !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			console.log('queryMe: ', 'seller', status);
			res.status(200).json(status);
		} else if (status === null) {
			res.status(400).json(status);
		}
	});
};