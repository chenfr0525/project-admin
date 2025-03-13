//express框架
var express = require('express');
//nodejs内置path模块
var path = require('path');
//解析cookie
var cookieParser = require('cookie-parser');
//日志文件
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 后台路由文件
var adminArticlesRouter = require('./routes/admin/articles');
var adminStudentsRouter = require('./routes/user/students');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//挂载路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/articles',adminArticlesRouter)
app.use('/user/students',adminStudentsRouter)

module.exports = app;
