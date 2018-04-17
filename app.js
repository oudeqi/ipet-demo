const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const { COOKIE_SECRET, COOKIE_NAME, COOKIE_MAXAGE } = require('./config/index');

// 引入 mongoose 配置文件
const mongoose_config = require('./config/mongoose.js');
// 执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
const mongoose = mongoose_config();

const index = require('./routes/index');
const pet = require('./routes/pet');
const users = require('./routes/users');
const other = require('./routes/other');
const test = require('./routes/test');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//--------------------------------------------
//注册模板引擎的后缀名
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: COOKIE_SECRET,
    name: COOKIE_NAME,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: COOKIE_MAXAGE},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
// 上传图片的文件
app.use(express.static(path.join(__dirname, 'uploads')));

// 允许跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");  
//     next();  
// });

app.use('/', index);
app.use('/', other);
app.use('/pet', pet);
app.use('/users', users);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
