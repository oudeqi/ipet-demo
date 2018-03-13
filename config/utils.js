module.exports = {
  isUrl (value) {
    // return /^(ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(value)
    return value
  },
  isPhone (value) {
    return true
  },
  isEmail (value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    // return value
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
  }
}