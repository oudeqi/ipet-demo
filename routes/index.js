const express = require('express');
const router = express.Router();

const log4js= require('../config/log4js.js')
const logger = log4js.getLogger('routes/index.js/')

router.get('/', function(req, res, next) {

	logger.info('routes/index.js info')
	logger.error('routes/index.js error')

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
