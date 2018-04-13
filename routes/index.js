const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const User = require('../models/user.js');
const multer  = require('multer');  

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

// 创建文件夹
const createFolder = function(folder){
    try{
    	// 同步判断文件夹是否存在
        fs.accessSync(folder, fs.constants.F_OK); 
    }catch(e){
    	// 同步创建文件夹
        fs.mkdirSync(folder);
    }  
};

const renameUploadFile = function (fileName){
	// let prefix = fileName.split('.').reverse().slice(1).reverse().join('.');
	// let Suffix = fileName.split('.').reverse()[0];
	// 原文件名 + 时间毫秒数 + 随机数
	// return (prefix + '_' + new Date().getTime() + '_' + String(Math.random()).substring(2) + '.' + Suffix);
	let lastIndex = fileName.lastIndexOf('.');
	let prefix = fileName.substring(0, lastIndex);
	let Suffix = fileName.substring(lastIndex);
	return (prefix + '_' + new Date().getTime() + '_' + String(Math.random()).substring(2) + Suffix);
}

/* 上传图片 */ 
const upload = multer({
	storage: multer.diskStorage({  
		destination: function (req, file, cb) {
			let folderName = path.join(__dirname, '..', 'uploads');
			createFolder(folderName);
			cb(null, folderName);  
		},  
		filename: function (req, file, cb) {
			cb(null, renameUploadFile(file.originalname));  
		}  
	}),
	fileFilter: function (req, file, cb) {
		if (!file.mimetype.includes('image')) {
			// 拒绝这个文件，并返回错误
	  		cb(new Error('只能上传图片'))
			// 拒绝这个文件，使用`false`
	  		// cb(null, false)
		} else if (file.size > (1024 * 1024 * 10)) {
			cb(new Error('图片太大'))
		} else {
			// 接受这个文件，使用`true`
			cb(null, true)
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 10
	}
	// preservePath
})  
router.post('/upload', upload.single('avatar'), function(req, res, next) {
    let file = req.file;
	res.json({
		status: 'ok',
		msg: '文件上传成功',
		data: {
			fieldname: file.fieldname,
			originalname: file.originalname,
			encoding: file.encoding,
			mimetype: file.mimetype,
			filename: file.filename,
			size: file.size
		}
	});
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
