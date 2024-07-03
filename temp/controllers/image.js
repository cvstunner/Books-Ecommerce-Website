const path = require('path');
const multer = require('multer');
const fs = require('fs');
const fsE = require('fs-extra');

let username = '';
// let storage = undefined;
// let upload = undefined;
// getUsername = (req, res) => {
// 	username = req.session.username;
// 	uploadImage();
// } 

// username = 'cvstunner';
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(__dirname, '..' ,'userData', 'images', 'temp'));
	},
	filename: (req, file, callback) => {
		console.log(file);
		callback(null, file.originalname);
	}
});

const upload = multer({storage: storage});

exports.uploadImage = [upload.single('data'), async (req, res) => {
	console.log('user--img: : ', req.session.username);
	let username = await req.session.username;
	let dir = path.join(__dirname, '..' ,'userData', 'images', username);
	let oldDir = path.join(__dirname, '..' ,'userData', 'images', 'temp', req.file.filename);
	let newDir = path.join(__dirname, '..' ,'userData', 'images', username, req.file.filename);
	let resDir = 'userData/images/' + username + '/' + req.file.filename;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	fsE.move(oldDir, newDir, {overwrite: true}, function(err){
		if (err) throw err;
	});
    res.status(200).json({dir: resDir});
}];