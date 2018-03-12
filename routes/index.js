var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
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
