var express = require('express');
var router = express.Router();
const { Plancourse } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询依计划推荐课程列表(模糊搜索)++所有
 * GET /admin/plancourses
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

    // const plancourses = await Plancourse.findAll(condition)
    const { count, rows } = await Plancourse.findAndCountAll(condition)

    success(res, '查询依计划推荐课程列表成功', {
      plancourses: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize
      }
    })
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询依计划推荐课程详情(id)
 * GET /admin/plancourses/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const plancourse = await getPlancourse(req)

    success(res,'查询依计划推荐课程详情成功',{plancourse})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建依计划推荐课程
 * POST /admin/plancourses
 */
router.post('/', async function (req, res,) {
  try {
    const plancourse = await Plancourse.create(req.body)

    success(res,'发送成功',{plancourse},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除依计划推荐课程
 * DELETE /admin/plancourses/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const plancourse = await getPlancourse(req)


    await plancourse.destroy()
    success(res,'删除依计划推荐课程成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新依计划推荐课程
 * PUT /admin/plancourses/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const plancourse = await getPlancourse(req)

    await plancourse.update(req.body)

    success(res,'更新依计划推荐课程成功',{plancourse})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前依计划推荐课程
 */
async function getPlancourse(req) {
  //获取依计划推荐课程ID
  const { id } = req.params

  //查询当前依计划推荐课程
  const plancourse = await Plancourse.findByPk(id)

  //如果没有找到就抛出异常
  if (!plancourse) {
    throw new NotFoundError(`ID:${id}的依计划推荐课程未找到`)
  }
  return plancourse
}

module.exports = router;
