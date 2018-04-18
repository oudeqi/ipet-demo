const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/fetch/:id', function (req, res, next) {
	res.json({
		ok: true,
		msg: 'success',
		data: 'i am body',
		sent: {
			params:req.params,
			query: req.query,
			body:req.body
		}
	});
});

/* 
fetch('/test/fetch/14?name=nana', {
			method: 'post',
			// headers: {
			// 	'Content-Type': 'application/json'
			// },
			body: JSON.stringify({
				age: 100
			})
		}).then(response => {
			let contentType = response.headers.get('content-type')
			if (contentType.includes('application/json')) {
				return response.json().then(json => {
					if (response.ok) {
						return json
					} else {
						return Promise.reject(Object.assign({}, json, {
							status: response.status,
							statusText: response.statusText
						}))
					}
				})
			} else if (contentType.includes('text/html')) {
				return response.text().then(text => {
					if (response.ok) {
						return json
					} else {
						return Promise.reject({
							status: response.status,
							statusText: response.statusText,
							err: text
						})
					}
				})
			} else {
				throw new Error(`Sorry, content-type ${contentType} not supported`)
			}
		})
		.then(data => console.log(data))
		.catch(error => console.log(error))
 */ 

module.exports = router;
