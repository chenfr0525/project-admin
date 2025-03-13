var express = require('express');
var router = express.Router();
const { Course } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询课程列表(模糊搜索)++所有
 * GET /admin/courses
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

    //模糊条件
    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`
        }
      }
    }

    // const courses = await Course.findAll(condition)
    const { count, rows } = await Course.findAndCountAll(condition)

    success(res, '查询课程列表成功', {
      courses: rows,
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
 * 查询课程详情(id)
 * GET /admin/courses/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const course = await getCourse(req)

    success(res,'查询课程详情成功',{course})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建课程
 * POST /admin/courses
 */
router.post('/', async function (req, res,) {
  try {
    const course = await Course.create(req.body)

    success(res,'发送成功',{course},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除课程
 * DELETE /admin/courses/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const course = await getCourse(req)


    await course.destroy()
    success(res,'删除课程成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新课程
 * PUT /admin/courses/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const course = await getCourse(req)

    await course.update(req.body)

    success(res,'更新课程成功',{course})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前课程
 */
async function getCourse(req) {
  //获取课程ID
  const { id } = req.params

  //查询当前课程
  const course = await Course.findByPk(id)

  //如果没有找到就抛出异常
  if (!course) {
    throw new NotFoundError(`ID:${id}的课程未找到`)
  }
  return course
}

module.exports = router;
