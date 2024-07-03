const app = require("./routing.js");

exports.create = (req, res) => {
	res.send('File created!');
}

exports.read = (req, res) => {
	res.send('File readed!');
}

exports.update = (req, res) => {
	res.send('File updated!');
}