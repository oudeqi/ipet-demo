const path = require('path');
const svgCaptcha = require('svg-captcha');
const multer  = require('multer');  
const { createFolder } = require('../config/utils')
const { STATIC_PATH } = require('../config/index')

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

const multerOpts = {
	storage: multer.diskStorage({  
		destination: function (req, file, cb) {
			let folderName = path.join(__dirname, '..', '..', 'uploads');
			createFolder(folderName);
			cb(null, folderName);  
		},  
		filename: function (req, file, cb) {
			cb(null, renameUploadFile(file.originalname));  
		}  
	}),
	fileFilter: function (req, file, cb) {
		if (!file.mimetype.includes('image')) {
	  		cb(new Error('只能上传图片'))
		} else {
			cb(null, true)
		}
		// 拒绝文件，但是不报错
		// cb(null, false)
	},
	limits: {
		fileSize: 1024 * 1024 * 10 //超过10M报错
	}
	// preservePath
}
const upload = multer(multerOpts).single('avatar')

/* 获取首页html */ 
exports.getIndexHtml = function(req, res, next) {
	if (req.session.user) {
		res.render('index', { session: req.session });
	} else {
		res.redirect(302, '/users/login');
	}
}

/* 获取图片验证码 */ 
exports.getCaptcha = function(req, res, next) {
	let captcha = svgCaptcha.createMathExpr();
	req.session.captcha = captcha.text;
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
}

/* 获取图片验证码 */ 
exports.uploadPic = function(req, res, next) {
	upload(req, res, function (err) {
		if (err) {
			return res.json({
				ok: false,
				msg: err.message
			});
		}
		if (!req.file) {
			return res.json({
				ok: false,
				msg: '没有上传任何图片',
				data: null
			})
		}
		let file = {
			fieldname: req.file.fieldname,
			originalname: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			filename: req.file.filename,
			size: req.file.size,
			baseUrl: STATIC_PATH + '/'
		};
	    res.json({
			ok: true,
			msg: '文件上传成功',
			data: file
		});
	})
}