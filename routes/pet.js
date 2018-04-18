const express = require('express');
const router = express.Router();
const multer  = require('multer');  
const { PET_CATEGORY } = require('../config')
router.post('/add', multer({ dest: 'uploads/' }).none(), function (req, res, next) {
	res.json({
		ok: true,
		msg: 'success',
		data: PET_CATEGORY,
		sent: {
			params:req.params,
			query: req.query,
			body:req.body
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
