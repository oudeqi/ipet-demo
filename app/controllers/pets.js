const path  = require('path');
const Pet = require('../models/pet.js');
const { PET_CATEGORY } = require('../config')
const { createFolder, copySingleFile, fileExists } = require('../config/utils')

/* 获取类别 */ 
exports.getCategory = function (req, res, next) {
	res.json({
		ok: true,
		msg: 'success',
		data: PET_CATEGORY
	})
}

/* 添加 */ 
exports.add = function (req, res, next) {
	let { avatar, name, category, varieties, birthday } = req.body
	let msg = 'success'
	if (!avatar) {
		msg = '请上传头像'
	}
	let avatarPath = path.resolve(__dirname, '..', '..', 'uploads', path.basename(avatar))
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
			createFolder(path.resolve(__dirname, '..', 'avatar'))
			copySingleFile(avatarPath, path.resolve(__dirname, '..', 'avatar', path.basename(avatar)))
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
}