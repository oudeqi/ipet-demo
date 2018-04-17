const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session.user) {
		res.render('index', { session: req.session });
	} else {
		res.redirect(302, '/users/login');
	}
});

router.get('/index.html', function(req, res, next) {
	if (req.session.user) {
		res.render('index', { session: req.session });
	} else {
		res.redirect(302, '/users/login');
	}
});

module.exports = router;
