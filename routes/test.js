const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/fetch/:id', function (req, res, next) {
	res.json({
		ok: true,
		body: 'i am body',
		sent: {
			params:req.params,
			query: req.query,
			body:req.body
		}
	});
});

module.exports = router;
