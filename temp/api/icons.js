const express = require('express');
const router = express.Router()
const path = require('path');

router.get('/acc_red_100px.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../icons/acc_red_100px.png'));
});
router.get('/srch2_red_b.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../icons/srch2_red_b.png'));
});
router.get('/icons8_Favorite_Cart_128px_1.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../icons/icons8_Favorite_Cart_128px_1.png'));
});
router.get('/mt_hrt2_50px.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../icons/mt_hrt2_50px.png'));
});
router.get('/red_hrt2_50px.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../icons/red_hrt2_50px.png'));
});

module.exports = router;