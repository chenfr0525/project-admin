//express框架
var express = require('express');
//nodejs内置path模块
var path = require('path');
//解析cookie
var cookieParser = require('cookie-parser');
require('dotenv').config()
//日志文件
var logger = require('morgan');
//处理跨域
const cors = require('cors')

const adminAuth=require('./middlewares/admin-auth')
const studentAuth=require('./middlewares/student-auth')

// 后台路由文件
var adminHomeRouter=require('./routes/admin/home')
var adminArticlesRouter = require('./routes/admin/articles');
var adminsRouter = require('./routes/admin/admin');
var informationArticlesRouter = require('./routes/admin/informations');
var adminChartRouter = require('./routes/admin/charts');
var adminAuthRouter = require('./routes/admin/auth');
var uploadRouter = require('./routes/up');
//前台路由文件
var indexRouter = require('./routes/index');
var userStudentsRouter = require('./routes/user/students');
var algorithmRouter = require('./routes/user/basicalgorithms');
var carouselImageRouter = require('./routes/user/carouselimages');
var commonErrorRouter = require('./routes/user/commonerrors');
var courseRouter = require('./routes/user/courses');
var informationStatusRouter = require('./routes/user/informationstatuses');
var instructorRouter = require('./routes/user/instructors');
var motivationQuoteRouter = require('./routes/user/motivationallquotes');
var plansRouter = require('./routes/user/plans');
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

//处理跨域
app.use(cors())

//挂载路由
app.use('/upload',uploadRouter)
//后台
app.use('/admin/home',adminHomeRouter)
app.use('/admin/articles',adminAuth,adminArticlesRouter)
app.use('/admin/informations',informationArticlesRouter)
app.use('/admin/chart',adminAuth,adminChartRouter)
app.use('/admin/auth',adminAuthRouter)
app.use('/admin',adminsRouter)
//前台
app.use('/user/auth',userAuthRouter)
app.use('/user/students',userStudentsRouter)
app.use('/user/algorithms',algorithmRouter)
app.use('/user/carouselimage',carouselImageRouter)
app.use('/user/commonerror',commonErrorRouter )
app.use('/user/courses',courseRouter)
app.use('/user/informationstatus',studentAuth,informationStatusRouter)
app.use('/user/instructor',instructorRouter)
app.use('/user/motivationquote',motivationQuoteRouter)
app.use('/user/plans',studentAuth,plansRouter)
app.use('/user/remends',remendRouter)
app.use('/user/studytime',studentAuth,studyTimeRouter)
app.use('/user/weektime',studentAuth,weekTimeRouter)
app.use('/user',studentAuth, indexRouter);


module.exports = app;
