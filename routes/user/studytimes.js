var express = require('express');
var router = express.Router();
const { StudyTime } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 查询学习时间列表(模糊搜索)++所有
 * GET /admin/studytimes
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query

    //分页处理
    //当前是第几页，如果不传，那就是第一页
    const currentPage = Math.abs(Number(query.currentPage)) || 1
    //每页显示多少条数据，如果不传，那就显示10条
    const pageSize = Math.abs(Number(query.pageSize)) || 10
    //计算offset
    const offset = (currentPage - 1) * pageSize

    const condition = {
      order: [['id', 'DESC']],
      limit: pageSize,
      offset: offset
    }

    condition.where = getLikeStudyTime(query)

    // const studytimes = await StudyTime.findAll(condition)
    const { count, rows } = await StudyTime.findAndCountAll(condition)

    success(res, '查询学习时间列表成功', {
      studytimes: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize
      }
    })
  }
  catch (error) {
    failure(res, error)
  }
});

/**
 * 查询学习时间详情(studentId)
 * GET /admin/studytimes/:studentId
 */
router.get('/:studentId', async function (req, res, next) {
  try {

    //获取学习时间ID
    const { studentId } = req.params

    //查询当前学习时间
    const studytime = await StudyTime.findOne({
      where: {
        studentId     
      }
    })

    //如果没有找到就抛出异常
    if (!studytime) {
      throw new NotFoundError(`ID:${studentId}的学习时间未找到`)
    }

    success(res, '查询学习时间详情成功', { studytime })
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 创建学习时间
 * POST /admin/studytimes
 */
router.post('/', async function (req, res,) {
  try {
    const studytime = await StudyTime.create(req.body)

    success(res, '发送成功', { studytime }, 201)
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 删除学习时间
 * DELETE /admin/studytimes/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const studytime = await getStudyTime(req)


    await studytime.destroy()
    success(res, '删除学习时间成功')
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 更新学习时间
 * PUT /admin/studytimes/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const studytime = await getStudyTime(req)

    await studytime.update(req.body)

    success(res, '更新学习时间成功', { studytime })

  } catch (error) {
    failure(res, error)
  }
})

/**
 * 公共方法：查询当前学习时间
 */
async function getStudyTime(req) {
  //获取学习时间ID
  const { id } = req.params

  //查询当前学习时间
  const studytime = await StudyTime.findByPk(id)

  //如果没有找到就抛出异常
  if (!studytime) {
    throw new NotFoundError(`ID:${id}的学习时间未找到`)
  }
  return studytime
}

/**
 * 公共方法：模糊查询
 */
function getLikeStudyTime(query) {
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
