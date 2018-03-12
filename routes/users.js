var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var svgCaptcha = require('svg-captcha');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 获取图片验证码 */ 
router.get('/captcha', function(req, res, next) {
	var captcha = svgCaptcha.createMathExpr();
	console.log(captcha.text)
	// req.session.captcha = captcha.text;
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
});

/* 注册页面 */ 
router.get('/reg', function(req, res, next) {
  res.render('users-reg', { title: 'users-reg' });
});

/* 删除所有用户 */ 
router.get('/delete', function(req, res, next) {
	User.find({}, function (err,docs) {
		if (err) {
			console.log('find err:', err);
    		return;
		}
		if (docs.length !== 0) {
			docs.forEach(item => {
				item.remove();
			})
		}
		res.json(docs);
	})
});

module.exports = router;
