const fs = require('fs');

module.exports = {
  isUrl (value) {
    return /^(ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(value)
  },
  isPhone (value) {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)
  },
  isEmail (value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
  },
  isPassword (value) {
    return /[0-9A-Za-z_]{6,18}$/.test(value)
  },
  loadScript (src, callback) {
    if (document.getElementById('ggMapScript')) {
      callback()
    } else {
      let head = document.getElementsByTagName('head')[0]
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'ggMapScript'
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          callback()
          script.onload = script.onreadystatechange = null
        }
      }
      script.src = src
      head.appendChild(script)
    }
  },
  trim (str) {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return str.replace(reExtraSpace, '$1')
  },
  // 创建文件夹
  createFolder (folder) {
    try{
      // 同步判断文件夹是否存在
        fs.accessSync(folder, fs.constants.F_OK); 
    }catch(e){
      // 同步创建文件夹
        fs.mkdirSync(folder);
    }  
  },
  // 复制单个文件
  copySingleFile (src, dist) {
    let fileReadStream = fs.createReadStream(src)
    let fileWriteStream = fs.createWriteStream(dist)
    fileReadStream.pipe(fileWriteStream)
    fileWriteStream.on('close', function(){  
      console.log('copy over');    
    });
  },
  // 文件是否存在
  fileExists (path) {
    try {
      fs.accessSync(path, fs.constants.F_OK)
      return true
    } catch (err) {
      return false
    }
  }
}