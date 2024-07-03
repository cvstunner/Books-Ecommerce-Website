const router = express.Router();

router.post('/create', function(req, res) {
	res.send('File created!');
});

router.get('/read', function(req, res) {
	res.send('File readed!');
});

router.put('/update', function(req, res) => {
	res.send('File updated!');
});

module.exports = router;