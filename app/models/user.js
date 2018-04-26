const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  phone: String,
  password: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  lastLogin: Date,
  salt: String,
  passKey: String
}, {
  // 在MongDB中默认使用Model的名字作为集合的名字，如过需要自定义集合的名字，可以通过设置这个选项
  collection : 'users',
  // capped : Number, //上限设置,此属性对批量操作有效，用来限制一次对数据库操作的量
});

/* statics是给model添加方法，methods是给实例（instance）添加方法 */

// 自定义实例方法：model的实例是document，内置有实例方法，如save，
UserSchema.methods.methodFunc = function(cb) {
  cb()
}

// 自定义静态方法：model的静态方法，如find，update等
UserSchema.statics.staticFunc = function(cb) {
  cb()
}

module.exports = mongoose.model('User', UserSchema);