const app = require("../js/app.js");

exports.getData = async (req, res) => {
    if (req.query.catg !== 'All'){
        catgQuery = ' AND products.category = ?;';
    }
    else{
        catgQuery = ';';
    }

    query = 'SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename FROM products JOIN book_filename ON products.fileId = book_filename.fileId where products.quantity > 0 AND products.retail_price >= ? AND products.retail_price <= ?' + catgQuery;

	app.selectQuery(query, [parseInt(req.query.pc_fm), parseInt(req.query.pc_to), req.query.catg,], function (status) {
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