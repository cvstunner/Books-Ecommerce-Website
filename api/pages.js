const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

router.get('/login.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../login.html'));
});
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/product.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../product.html'));
});
router.get('/userProducts.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../userProducts.html'));
});
router.get('/cart.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../cart.html'));
});
router.get('/wishlist.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../wishlist.html'));
});
router.get('/user.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../user.html'));
});
router.get('/admin.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../admin.html'));
});
router.get('/orders.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../orders.html'));
});
router.get('/js/header.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/header.js'));
});
router.get('/js/index.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/index.js'));
});
router.get('/js/getValues.mjs', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/getValues.mjs'));
});
router.get('/js/db.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/db.js'));
});
router.get('/js/app.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/app.js'));
});
router.get('/js/signinup.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/signinup.js'));
});
router.get('/js/sessionStorage.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/sessionStorage.js'));
});
router.get('/js/products.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/products.js'));
});
router.get('/js/product.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/product.js'));
});
router.get('/js/cart.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/cart.js'));
});
router.get('/js/wishlist.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/wishlist.js'));
});
router.get('/js/orders.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/orders.js'));
});
router.get('/js/admin.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/admin.js'));
});
router.get('/js/user.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/user.js'));
});
router.get('/js/query.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/query.js'));
});

module.exports = router;