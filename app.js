//express框架
var express = require('express');
//nodejs内置path模块
var path = require('path');
//解析cookie
var cookieParser = require('cookie-parser');
//日志文件
var logger = require('morgan');

require('dotenv').config()
const adminAuth=require('./middlewares/admin-auth')
const studentAuth=require('./middlewares/student-auth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 后台路由文件
var adminArticlesRouter = require('./routes/admin/articles');
var adminsRouter = require('./routes/admin/admin');
var informationArticlesRouter = require('./routes/admin/informations');
var adminChartRouter = require('./routes/admin/charts');
var adminAuthRouter = require('./routes/admin/auth');
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
var weekTimeRouter = require('./routes/user/weektimes');
var userAuthRouter = require('./routes/user/auth');



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
app.use('/admin/articles',adminAuth,adminArticlesRouter)
app.use('/admin/informations',adminAuth,informationArticlesRouter)
app.use('/admin/chart',adminAuth,adminChartRouter)
app.use('/admin/auth',adminAuthRouter)
app.use('/admin',adminsRouter)

//前台
app.use('/user/auth',userAuthRouter)
app.use('/user/students',userStudentsRouter)
app.use('/user/algorithms',studentAuth,algorithmRouter)
app.use('/user/carouselimage',studentAuth,carouselImageRouter)
app.use('/user/commonerror',studentAuth,commonErrorRouter )
app.use('/user/coursechapter',studentAuth,courseChapterRouter)
app.use('/user/courses',studentAuth,courseRouter)
app.use('/user/informationstatus',studentAuth,informationStatusRouter)
app.use('/user/instructor',instructorRouter)
app.use('/user/motivationquote',motivationQuoteRouter)
app.use('/user/plancourse',studentAuth,planCourseRouter)
app.use('/user/plans',studentAuth,plansRouter)
app.use('/user/progress',studentAuth,progressRouter)
app.use('/user/remends',remendRouter)
app.use('/user/studytime',studentAuth,studyTimeRouter)
app.use('/user/weektime',studentAuth,weekTimeRouter)


module.exports = app;
