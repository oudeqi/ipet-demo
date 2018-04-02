const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user.js');
const { trim } = require('lodash')
const { isPhone, isPassword } = require('../config/utils')

/* 用户登录 */
router.get('/login', function(req, res, next) {
  res.render('users/login', {session: req.session});
});
router.post('/login', function(req, res, next) {
  let username = trim(req.body.username)
  let password = req.body.password
  let captcha = req.body.captcha
  if (!captcha || captcha !== req.session.captcha) {
    res.json({
      status: 'error',
      msg: '验证码不正确',
      data: null
    });
    return;
  }
  var cond = {
    $or: [
      {phone: username},
      {email: username}
    ]
  };
  User.find(cond, function(err, docs){
    if(err) {
      throw err;
    }
    console.log(docs)
    let users = docs.filter((doc) => {
      let shasum = crypto.createHmac('sha256', doc.passKey);
      let pass = shasum.update(password + doc.salt).digest('hex');
      return pass === doc.password
    })
    if (users.length > 0) {
      console.log(users[0])
      users[0].lastLogin = new Date()
      users[0].save()
      req.session.user = users[0]
      res.json({
        status: 'ok',
        msg: '登录成功',
        data: users[0] // TODO
      });
    } else {
      res.json({
        status: 'error',
        msg: '登录用户名或者密码不正确',
        data: null
      });
    }
  })
});

/* 注册用户 */
router.get('/reg', function(req, res, next) {
  res.render('users/reg', {session: req.session});
});
router.post('/reg', function(req, res, next) {
  let phone = trim(req.body.phone)
  let password = req.body.password
  let captcha = req.body.captcha
  if (!captcha || captcha !== req.session.captcha) {
    res.json({
      status: 'error',
      msg: '验证码不正确',
      data: req.body
    });
    return;
  }
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
