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
var adminsRouter = require('./routes/admin/admin');
var informationArticlesRouter = require('./routes/admin/informations');
//前台路由文件
var userStudentsRouter = require('./routes/user/students');
var algorithmRouter = require('./routes/user/basicalgorithms');
var carouselImageRouter = require('./routes/user/carouselimages');
var commonErrorRouter = require('./routes/user/commonerrors');
var courseChapterRouter = require('./routes/user/coursechapters');
var courseRouter = require('./routes/user/courses');
var informationStatusRouter = require('./routes/user/informationstatuses');
var instructorRouter = require('./routes/user/instructors');
var motivationQuoteRouter = require('./routes/user/motivationallquotes');
var planCourseRouter = require('./routes/user/plancourses');
var plansRouter = require('./routes/user/plans');
var progressRouter = require('./routes/user/progresses');
var remendRouter = require('./routes/user/remends');
var studyTimeRouter = require('./routes/user/studytimes');



var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//挂载路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
//后台
app.use('/admin/articles',adminArticlesRouter)
app.use('/admin/informations',informationArticlesRouter)
app.use('/admin',adminsRouter)

//前台
app.use('/user/students',userStudentsRouter)
app.use('/user/algorithms',algorithmRouter)
app.use('/user/carouselimage',carouselImageRouter)
app.use('/user/commonerror',commonErrorRouter )
app.use('/user/coursechapter',courseChapterRouter)
app.use('/user/courses',courseRouter)
app.use('/user/informationstatus',informationStatusRouter)
app.use('/user/instructor',instructorRouter)
app.use('/user/motivationquote',motivationQuoteRouter)
app.use('/user/plancourse',planCourseRouter)
app.use('/user/plans',plansRouter)
app.use('/user/progress',progressRouter)
app.use('/user/remends',remendRouter)
app.use('/user/studytime',studyTimeRouter)


module.exports = app;
