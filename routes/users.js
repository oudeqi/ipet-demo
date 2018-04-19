const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user.js');
const { trim } = require('lodash')
const { isPhone, isPassword } = require('../config/utils')

const random = function () {
  return String(Math.random()).substring(2)
}
const convert = function (value) {
  return value.substr(0, 10).padEnd(20, 'dyrcjqlgcj')
}
const convertPassword = function (password, salt, passKey) {
  return crypto.createHmac('sha256', passKey).update(password + salt).digest('hex')
}

/* 用户登录 */
router.get('/login', function(req, res, next) {
  res.render('users/login', {session: req.session});
});

router.post('/login', function(req, res, next) {
  let { username, password, captcha } = req.body
  username = trim(username)
  if (!captcha || captcha !== req.session.captcha) {
    return res.json({
      ok: false,
      msg: '验证码不正确',
      data: null
    })
  }
  let cond = {
    $or: [
      {phone: username},
      {email: username}
    ]
  }
  User.find(cond, function(err, docs){
    if(err) return next(err)
    let users = docs.filter((doc) => {
      return doc.password === convertPassword(password, convert(doc.salt), convert(doc.passKey))
    })
    if (users.length === 0) {
      return res.json({
        ok: false,
        msg: '登录用户名或者密码不正确',
        data: null
      })
    }
    let currUser = users[0]
    currUser.lastLogin = new Date()
    currUser.save()
    req.session.user = currUser
    res.locals = {message:'登陆成功'};
    res.json({
      ok: true,
      msg: '登录成功',
      data: users[0] // TODO
    })
  })
});

/* 注册用户 */
router.get('/reg', function(req, res, next) {
  res.render('users/reg', {session: req.session});
});

router.post('/reg', function(req, res, next) {
  let {phone, password, captcha} = req.body
  if (!captcha || captcha !== req.session.captcha) {
    return res.json({
      ok: false,
      msg: '验证码不正确',
      data: req.body
    })
  }
  let msg = 'success';
  if (!isPhone(phone)) {
    msg = '手机号码格式不正确'
  }
  if (!isPassword(password)) {
    msg = '密码格式不正确'
  }
  if (msg !== 'success') {
    return res.json({
      ok: false,
      msg: msg,
      data: req.body
    });
  }
  User.findOne({phone: phone}, function(err, doc){
    if(err) return next(err)
    if (doc) {
      return res.json({
        ok: false,
        msg: '该手机号码已被注册',
        data: null
      })
    }
    let salt = random()
    let passKey = random()
    let user = new User({
      password: convertPassword(password, convert(salt), convert(passKey)),
      phone,
      salt,
      passKey
    })
    user.save(function(err, doc) {
      if (err) return next(err);
      res.json({
        ok: true,
        msg: '注册成功',
        data: doc
      })
    })
  })
})

module.exports = router;
