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

/* 
1. 对于同步执行的代码，Express 会捕获所有在路由处理函数中的抛出的异常，
然后将它传给下一个错误处理中间件
app.get('/', function (req, res) {
 throw new Error('oh no!')
})
app.use(function (err, req, res, next) {
 console.log(err.message) // 噢！不!
})

2. 当异步程序在执行时抛出异常的情况，Express 就无能为力。
原因在于当你的程序开始执行回调函数时，它原来的栈信息已经丢失。
app.get('/', function (req, res) {
 queryDb(function (er, data) {
  if (er) throw er
 })
})
app.use(function (err, req, res, next) {
 // 这里拿不到错误信息
})

3. 对于这种情况，可以使用 next 函数来将错误传递给下一个错误处理中间件
app.get('/', function (req, res, next) {
 queryDb(function (err, data) {
  if (err) return next(err)
  // 处理数据
 
  makeCsv(data, function (err, csv) {
   if (err) return next(err)
   // 处理 csv
 
  })
 })
})
app.use(function (err, req, res, next) {
 // 处理错误
})
 */