const app = require("../js/app.js");

exports.getData = async (req, res) => {
    let query = 'select cart.quantity, cart.userId, cart.cartId, products.productId, products.title, products.author, products.MRP_price, products.retail_price, book_filename.filename from cart INNER JOIN products ON cart.productId=products.productId JOIN book_filename ON products.fileId = book_filename.fileId where cart.userId = ?';
	app.selectQuery(query, req.session.userId, function (response) {
		console.log('query: ', 'cart', response);
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