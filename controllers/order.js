const app = require("../js/app.js");

exports.createData = (req, res) => {
	console.log("Session: ", req.session);
	let body = [req.body.values[0], req.body.values[1], req.body.values[2], req.body.values[3], req.body.values[4], req.body.values[5], req.session.userId];
	app.selectQuery('INSERT INTO orders (quantity, total, date, time, productId, addressId, userId) values (?, ?, ?, ?, ?, ?, ?);SET @orderId = LAST_INSERT_ID();SELECT @orderId;', body, function (response) {
		console.log(response);
		if (response !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			console.log('query: ', 'user', response);
			res.status(200).json(response);
		} else if (response === null) {
			res.status(200).json(response);
		} else if (response === undefined) {
			res.status(400).json(response);
		}
	});
};

// (req.body.values).splice(5, 0, req.session.userId)