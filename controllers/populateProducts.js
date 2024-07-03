const app = require("../js/app.js");
const path = require('path');

exports.populateProducts = async (req, res) => {
	if(req.query.qid === '0'){
		app.selectQuery("SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename FROM products JOIN book_filename ON products.fileId = book_filename.fileId WHERE category = ?", req.body.values, function (response) {
			console.log(response);
			if (response !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				res.status(200).json(response);
			} else if (response === null) {
				res.send("Login Failed!");
			}
		});
	}
	else if(req.query.qid === '1'){
		app.selectQuery("SELECT products.productId, products.title, products.author, products.category, products.ratings, products.quantity, products.MRP_price, products.retail_price, book_filename.filename, description.description FROM products JOIN book_filename ON products.fileId = book_filename.fileId JOIN description ON products.dscpId = description.dscpId where products.title like ? OR products.author like ? OR products.category like ? OR description.description like ?", req.body.values, function (response) {
			console.log(response);
			if (response !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				res.status(200).json(response);
			} else if (response === null) {
				res.send("Login Failed!");
			}
		});
	}
};