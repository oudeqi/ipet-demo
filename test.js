var crypto = require('crypto')
const path  = require('path');
const fs  = require('fs');

// crypto.randomBytes(20, function (err, salt) {
//   if (err) {
//     throw err;
//   } else {
//     salt = salt.toString('hex')
//     console.log(salt)
//     var shasum = crypto.createHmac('sha256', '' + new Date().getTime())
//     shasum.update('123456' + salt)
//     var d = shasum.digest('hex')
//     console.log(d);
//   }
// })


const random = function () {
  return String(Math.random()).substring(2)
}

const convert = function (value) {
  return value.substr(0, 10).padEnd(20, 'dyrcjqlgcj')
}

const convertPassword = function (password, salt, passKey) {
  return crypto.createHmac('sha256', passKey).update(password + salt).digest('hex')
}

// let salt = random()
// let passKey = random()
// let pwd = convertPassword('111111', convert(salt), convert(passKey))

let xxx = path.resolve(__dirname, 'uploads', 'head-pic_1524125912291_36758234863743167.png');

const fileExists = function (path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

console.log(fileExists(xxx))

function copySingleFile (src, dist) {
  let fileReadStream = fs.createReadStream(src)
  let fileWriteStream = fs.createWriteStream(dist)
  fileReadStream.pipe(fileWriteStream)
  fileWriteStream.on('close', function(){  
    console.log('copy over');    
  });
}

// copySingleFile('./7.jpg', './9.jpg')
 