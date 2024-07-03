import {conn} from './express.js';
const mysql = require('mysql');
const config = require('./config.js');

let login = (username, password) => {
	let sql = "Select * from users where username like ? and password like ?";
	conn.connect(function(err){
		if(err) throw err;
		console.log("Login Connected!");
		conn.query(sql, [username, password], function(err, result){
			if(err) throw err;
			if(Object.keys(result).length != 0){
				console.log("Login Succesfully!");
				return true;
			}
			else{
				console.log("Wrong Crediantials!");
				return false;
			}
		});
	});
	conn.end();
}

module.exports = {login};
