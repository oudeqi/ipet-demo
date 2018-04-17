const express = require('express');
const router = express.Router();

router.post('/add', function(req, res, next) {
	console.log(req.body)
	res.json({
		ok: true,
		msg: 'msg',
		data: 'i am data'
	})
});



module.exports = router;
