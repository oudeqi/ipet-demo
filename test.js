var crypto = require('crypto')

crypto.randomBytes(20, function (err, salt) {
  if (err) {
    throw err;
  } else {
    salt = salt.toString('hex')
    console.log(salt)
    var shasum = crypto.createHmac('sha256', '' + new Date().getTime())
    shasum.update('123456' + salt)
    var d = shasum.digest('hex')
    console.log(d);
  }
})


