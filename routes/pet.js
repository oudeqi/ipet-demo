const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path  = require('path');
const Pet = require('../models/pet.js');
const { PET_CATEGORY } = require('../config')

function copySingleFile (src, dist) {
  let fileReadStream = fs.createReadStream(src)
  let fileWriteStream = fs.createWriteStream(dist)
  fileReadStream.pipe(fileWriteStream)
  fileWriteStream.on('close', function(){  
    console.log('copy over');    
  });
}

const fileExists = function (path) {
	try {
		fs.accessSync(path, fs.constants.F_OK)
		return true
	} catch (err) {
		return false
	}
}

router.post('/add', multer({ dest: 'uploads/' }).none(), function (req, res, next) {
	let { avatar, name, category, varieties, birthday } = req.body
	let msg = 'success'
	if (!avatar) {
		msg = '请上传头像'
	}
	// let avatarPath = path.resolve(__dirname, '..', 'uploads', avatar)
	let avatarPath = path.resolve(__dirname, '..', 'uploads', '_sprites_1524132700026_21971491287884337.png')
	console.log('avatarPath----------------------------------')
	console.log(avatarPath)
	console.log(fileExists(avatarPath))
	
	if (!fileExists(avatarPath)) {
		msg = '头像不存在，请重新上传'
	}
	if (!name) {
		msg = '名字不能为空'
	}
	if (!category) {
		msg = '请选择类别'
	}
	if (!varieties) {
		msg = '请选择品种'
	}
	if (new Date(parseInt(birthday)).toString() === 'Invalid Date') {
		msg = '时间输入有误'
	}
	if (msg !== 'success') {
		return res.json({
			ok: false,
			msg: msg,
			sent: {
				params:req.params,
				query: req.query,
				body:req.body
			}
		})
	}
	let p = new Pet({
		avatar: avatar,
		name: name,
		category: category,
		varieties: varieties,
		birthday: new Date(parseInt(birthday))
	})
	p.save(function(err, docs){
		if (err) {
			next(err)
		} else {
			// console.log('dist-avatarPath--------------------------')
			// console.log(path.resolve(__dirname, '..', 'public/images', avatar))
			// copySingleFile(avatarPath, path.resolve(__dirname, '..', 'public/images', avatar))
			res.json({
				ok: true,
				msg: 'success',
				data: docs,
				sent: {
					params:req.params,
					query: req.query,
					body:req.body
				}
			})
		}
	})
});

router.get('/category', function (req, res, next) {
	res.json({
		ok: true,
		msg: 'success',
		data: PET_CATEGORY
	})
})

module.exports = router;
