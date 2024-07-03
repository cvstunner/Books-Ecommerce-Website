const app = require("../js/app.js");
const bcrypt = require("bcryptjs");
const path = require("path");

exports.sellProduct = async (req, res) => {
	console.log(req.body, typeof req.body);
	let dcspId_value = 0;
	let fileId_value = 0;
	let specId_value = 0;
	app.selectQuery(
		"INSERT INTO description (description) value (?);Set @dcspId = LAST_INSERT_ID();INSERT INTO book_filename (filename) value (?);Set @fileId = LAST_INSERT_ID();INSERT INTO specifications (pages, pages_color, return_policy, country_of_origin) values (?, ?, ?, ?);Set @specId = LAST_INSERT_ID();SELECT @dcspId, @fileId, @specId",
		[
			req.body["dscp"],
			req.body["filename"],
			req.body["pages"],
			req.body["pages_colour"],
			req.body["return_policy"],
			req.body["country_of_origin"],
		],
		function (data) {
			if (data !== null) {
				app.querySellPro(
					[
						req.body["title"],
						req.body["author"],
						req.body["catg"],
						req.body["quantity"],
						req.body["MRP_price"],
						req.body["retail_price"],
						req.body["userId"],
						req.body["sellerId"],
						data[6][0]["@dcspId"],
						data[6][0]["@fileId"],
						data[6][0]["@specId"],
					],
					function (status) {
						console.log(status);
						if (status === true) {
							let userCreds = { title: req.body["title"] };
							res.header("Acces-Control-Allow-Origin", "*");
							res.header("Access-Control-Allow-Headers", "*");
							res.status(200).json(userCreds);
						} else if (status === false) {
							res.send("Sell Failed!");
						}
					}
				);
			} else if (data === null) {
				res.status(400).json(data);
			}
		}
	);
};
