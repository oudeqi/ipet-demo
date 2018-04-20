const express = require('express');
const router = express.Router();

const log4js= require('../config/log4js.js')
const logger = log4js.getLogger()
const errlogger = log4js.getLogger('err')
const othlogger = log4js.getLogger('oth')
const app = express()
log4js.useLogger(app, logger)//这样会自动记录每次请求信息，放在其他use上面

logger.info('test info 1')
errlogger.error('test error 1')
othlogger.info('test info 2')

router.get('/', function(req, res, next) {

	logger.info('test info 1')
	errlogger.error('test error 1')
	othlogger.info('test info 2')

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
