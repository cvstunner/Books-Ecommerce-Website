const app = require("../js/app.js");

exports.getData = async (req, res) => {
	let loginStatus = app.selectQuery('SELECT * FROM products WHERE productId = ?', req.query.productId, function (response) {
		console.log('queryMe: ', 'product', response);
		if (response !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			res.status(200).json(response);
		} else if (response === null) {
			res.response(200).json(response);
		}
		else if (response === undefined) {
			res.response(400).json(response);
		}
	});
};