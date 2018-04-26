const express = require('express');
const router = express.Router();
const multer  = require('multer');

const index = require('../controllers/index');
const pets = require('../controllers/pets');
const users = require('../controllers/users');

// 首页
router.get('/', index.getIndexHtml);
router.get('/index.html', index.getIndexHtml);
router.get('/captcha', index.getCaptcha);
router.post('/upload', index.uploadPic);

// 宠物
router.post('/pet/add', multer({ dest: 'uploads/' }).none(), pets.add);
router.get('/pet/category', pets.getCategory);

// 用户
router.get('/users/login', users.getLoginHtml);
router.post('/users/login', users.login);
router.get('/users/reg', users.getRegHtml);
router.post('/users/reg', users.reg);

module.exports = router;