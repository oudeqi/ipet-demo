const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		res.render('index', { session: req.session });
	} else {
		res.redirect(302, '/users/login');
	}
});

/* 获取图片验证码 */ 
router.get('/captcha', function(req, res, next) {
	let captcha = svgCaptcha.createMathExpr();
	req.session.captcha = captcha.text;
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
});

/* test */ 
router.get('/test', function(req, res, next){
	var user = new User({
		uid: 3,
		username: 'Sid'
	});
	user.save(function(err){
		if(err){
			res.end('Error');
			return next();
		}
		User.find({}, function(err, docs){
			if(err) {
				res.end('Error');
				return next();
			}
			res.json(docs);
		});
	});
});

module.exports = router;
