const express = require('express');
const router = express.Router()
const path = require('path');

router.get('/hand_n_book.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, '../images/hand_n_book.jpg'));
});
router.get('/so_many_books.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, '../images/so_many_books.jpg'));
});
router.get('/w-g-books.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, '../images/w-g-books.jpg'));
});
router.get('/b_book.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, '../images/b_book.jpg'));
});

module.exports = router;