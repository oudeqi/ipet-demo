var Book = require('./Book.model.js');

Book.find({}, function(err, docs){
  if(err) {
    console.log('err:', err);
    return;
  }

  console.log('result:', docs);
});