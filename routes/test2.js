var crypto = require('crypto')
const path  = require('path');
const fs  = require('fs');

const fileExists = function (path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

// let xxx = path.resolve(__dirname, '..', 'uploads', 'head-pic_1524125912291_36758234863743167.png');
let avatarPath = path.resolve(__dirname, '..', 'uploads', '_sprites_1524132700026_21971491287884337.png')
console.log('avatarPath----------------------------------')
console.log(avatarPath)
console.log(fileExists(avatarPath))