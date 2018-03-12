var Book = require('./Book.model.js');

var book = new Book({
  name: "xoxoxo",
  author: "xoxoxo",
  publishTime: new Date()
});

book.author = 'Jim';

book.save(function(err, res){
	if (err) {
	    console.log("Error:" + err);
	}
	else {
	    console.log("Res:" + res);
	}
});