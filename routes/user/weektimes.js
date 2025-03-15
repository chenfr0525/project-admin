var express = require('express');
var router = express.Router();
const { WeekTime,Student } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询每周上线时间列表(模糊搜索)++所有
 * GET /admin/weektimes
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query

    const condition = {
      ...getCondition(),
      order: [['id', 'DESC']],
    }

    //模糊条件
    getLikeWeekTime(query)

    // const weektimes = await WeekTime.findAll(condition)
    const { rows } = await WeekTime.findAndCountAll(condition)

    success(res, '查询每周上线时间列表成功', {
      weektimes: rows
    })
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询每周上线时间详情(id)
 * GET /admin/weektimes/:id
 */
router.get('/:studentId', async function (req, res, next) {
  try {
    //获取每周上线时间学生ID
  const { studentId } = req.params

  //查询每周上线时间
  const weektime = await WeekTime.findOne({
    where: {
      studentId     
    }
  })

  //如果没有找到就抛出异常
  if (!weektime) {
    throw new NotFound(`ID:${studentId}的学习时间未找到`)
  }



    success(res,'查询每周上线时间详情成功',{weektime})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建每周上线时间
 * POST /admin/weektimes
 */
router.post('/', async function (req, res,) {
  try {

    const body=req.body
    body.studentId=req.student.id


    const weektime = await WeekTime.create(body)

    success(res,'发送成功',{weektime},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除每周上线时间
 * DELETE /admin/weektimes/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const weektime = await getWeekTime(req)


    await weektime.destroy()
    success(res,'删除每周上线时间成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新每周上线时间
 * PUT /admin/weektimes/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const weektime = await getWeekTime(req)

    await weektime.update(req.body)

    success(res,'更新每周上线时间成功',{weektime})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['StudentId'] },//排序大写ID
    include: [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'username']
      }
    ]
  }
}

/**
 * 公共方法：查询当前每周上线时间
 */
async function getWeekTime(req) {
  //获取每周上线时间ID
  const { id } = req.params

  //查询当前每周上线时间
  const weektime = await WeekTime.findByPk(id)

  //如果没有找到就抛出异常
  if (!weektime) {
    throw new NotFound(`ID:${id}的每周上线时间未找到`)
  }
  return weektime
}

/**
 * 公共方法：模糊查询
 */
function getLikeWeekTime(query) {
  let search
  for (let key in query) {

    if (key !== 'pageSize' && key !== 'currentPage') {

      //模糊条件
      if (query[key]) {
        search = {
          [key]: {
            [Op.like]: `%${query[key]}%`
          }
        }
      }
    }

  }
  return search
}

module.exports = router;
