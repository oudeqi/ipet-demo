var Book = require('./Book.model.js');

Book.findOne({author: 'Jim'}, function(err, doc){
  if(err){
    console.log('findOne err:', err);
    return;
  }

  if(doc) {
    // remove() 也是有回调函数的，可以判断是否删除成功
    doc.remove();
  }
});