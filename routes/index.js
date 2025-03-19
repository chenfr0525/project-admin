var express = require('express');
var router = express.Router();
const { MotivationalQuote, CarouselImage, Remend, StudyTime,WeekTime } = require('../models')

//错误类
const { NotFound, BadRequest, Unauthorized } = require('../utils/errors')
const { success, failure } = require('../utils/response');

/**
 * 首页
 * GET 
 */
router.get('/', async function (req, res, next) {
  const body = req.body
  body.studentId = req.student.id
  const id=body.studentId
  try {
    //激励语句
    const quote = await MotivationalQuote.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    //轮播图
    const carouselImage = await CarouselImage.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    //推荐
    const remend = await Remend.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    //学习时间
    const studytime = await StudyTime.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', "studentId", 'date'] },
      where: { studentId: id },
    })
    // charts
    const weektime=await WeekTime.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', ] },
      where: { studentId: id },
    })
    success(res, '获取首页信息成功', { quote, carouselImage, remend, studytime,weektime })
  } catch (error) {
    failure(res, error)
  }
});

module.exports = router;
