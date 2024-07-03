const app = require("../js/app.js");

exports.getData = async (req, res) => {
	if(req.query.qid === '0'){
		let loginStatus = app.selectQuery('SELECT 1 from admin where userId = ?', req.session.userId, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
	else if(req.query.qid === '1'){
		let loginStatus = app.selectQuery("SELECT filename FROM profile_pic_filename WHERE IF ((SELECT @fileId:=fileId from users where userId = ? AND fileId != 'NULL'), true, false) AND fileId = @fileId;", req.session.userId, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
	else if(req.query.qid === '2'){
		let loginStatus = app.selectQuery('SELECT name, age, gender, contact, email, username FROM users where userId = ?', req.session.userId, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
	else if(req.query.qid === '3'){
		let loginStatus = app.selectQuery("SELECT fileId from users where userId = ? AND exists(select fileId from users where fileId != 'NULL')", req.session.userId, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
};

exports.putData = async (req, res) => {
	if(req.query.qid === '0'){
		let loginStatus = app.selectQuery('INSERT INTO profile_pic_filename (filename) value (?);Set @fileId = LAST_INSERT_ID();UPDATE users SET name = ?, age = ?, gender = ?, contact = ?, email = ?, username = ?, fileId = @fileId WHERE userId = ?', req.body.values, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
	else if(req.query.qid === '1'){
		let loginStatus = app.selectQuery('UPDATE profile_pic_filename SET filename = ? WHERE fileId = ?;UPDATE users SET name = ?, age = ?, gender = ?, contact = ?, email = ?, username = ? WHERE userId = ?', req.body.values, function (status) {
			console.log(status);
			if (status !== null) {
				res.header('Acces-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', '*');
				console.log('queryMe: ', 'seller', status);
				res.status(200).json(status);
			} else if (status === null) {
				res.status(200).json(status);
			} else if (status === undefined) {
				res.status(400).json(status);
			}
		});
	}
}

exports.createData = async (req, res) => {
	let loginStatus = app.selectQuery('INSERT into address (name, address, userId) values (?, ?, ?);SET @addressId = LAST_INSERT_ID();SELECT @addressId;', [req.body.values[0], req.body.values[1], req.session.userId], function (response) {
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
}

// (req.body.values).push(req.session.userId)