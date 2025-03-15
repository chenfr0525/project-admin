var express = require('express');
var router = express.Router();
const { Sequelize,StudyTime, sequelize } = require('../../models')
const {success,failure } = require('../../utils/response')

/**
 * 统计用户学习时间
 * GET /admin/chart/studytime
 */
router.get('/studytime', async function (req, res, next) {
  try {
    const small=await StudyTime.count({
      where: {
        duration: {
          [Sequelize.Op.gt]: '00:30:00'
        }
      }
    })
    const mid=await StudyTime.count({
      where: {
        duration: {
          [Sequelize.Op.gt]: '1:00:00'
        }
      }
    })
    const large=await StudyTime.count({
      where: {
        duration: {
          [Sequelize.Op.gt]: '2:00:00'
        }
      }
    })

    const data=[
      {value:large,name:'高'},
      {value:mid,name:'中'},
      {value:small,name:'低'},
    ]
   
    success(res, '查询学习时间成功', {data})
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 统计用户学习时间
 * GET /admin/chart/createtime
 */
router.get('/createtime', async function (req, res, next) {
  try {
    const [result]=await sequelize.query("SELECT COUNT(*) AS value,DATE_FORMAT(createdAt,'%Y-%m-%d') AS date FROM students GROUP BY date ORDER BY date DESC LIMIT 7")
   
    const data={
      dates:[],
      values:[]
    }

    result.forEach(item => {
      data.dates.push(item.date)
      data.values.push(item.value)
    });

    success(res, '查询创建时间成功', {data})
  }
  catch (error) {
    failure(res,error)
  }
});

module.exports = router;
