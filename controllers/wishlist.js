const app = require("../js/app.js");

exports.createData = async (req, res) => {
	app.selectQuery('INSERT into wishlist (productId, userId) Select ?, ? where NOT EXISTS (Select * from wishlist where productId = ? and userId = ?)', [req.body.values[0], req.session.userId, req.body.values[1], req.session.userId], function (response) {
		console.log('queryMe: ', 'seller', response);
		if (response !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			res.status(200).json(response);
		} else if (response === null) {
			res.status(200).json(response);
		}
		else if (response === undefined) {
			res.status(400).json(response);
		}
	});
};

exports.deleteData = async (req, res) => {
	app.selectQuery('delete from wishlist where productId = ? and userId = ?', [req.query.pid, req.session.userId], function (response) {
		console.log('queryMe: ', 'seller', response);
		if (response !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			res.status(200).json(response);
		} else if (response === null) {
			res.status(200).json(response);
		}
		else if (response === undefined) {
			res.status(400).json(response);
		}
	});
};