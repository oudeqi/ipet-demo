let express = require('express');
let router = express.Router();
let svgCaptcha = require('svg-captcha');
let crypto = require('crypto');
let User = require('../models/user.js');
let { trim } = require('lodash')
let { isPhone, isPassword } = require('../config/utils')

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

/* 展示注册页面 */
router.get('/reg', function(req, res, next) {
  res.render('users-reg', { title: 'users-reg' });
});

/* 注册用户 */
router.post('/reg', function(req, res, next) {
  let phone = trim(req.body.phone)
  let password = req.body.password
  if (!isPhone(phone)) {
    res.json({
      status: 'error',
      msg: '手机号码格式不正确',
      data: req.body
    });
    return;
  }
  if (!isPassword(password)) {
    res.json({
      status: 'error',
      msg: '密码格式不正确',
      data: req.body
    });
    return;
  }
  User.findOne({phone: phone}, function(err, doc){
    if(err) {
      throw err;
    }
    if (doc) {
      res.json({
        status: 'error',
        msg: '该手机号码已被注册',
        data: null
      });
    } else {
      let salt = '' + Math.random()
      let passKey = '' + Math.random()
      let shasum = crypto.createHmac('sha256', passKey)
      let user = new User({
        password: shasum.update(password + salt).digest('hex'),
        phone,
        salt,
        passKey
      })
      user.save(function(err, doc) {
        if (err) {
          throw err;
        } else {
          res.json({
            status: 'ok',
            msg: '注册成功',
            data: doc
          });
        }
      });
    }
  });
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
