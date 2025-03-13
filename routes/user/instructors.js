var express = require('express');
var router = express.Router();
const { Instructor } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询讲师列表(模糊搜索)++所有
 * GET /admin/instructors
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

    // const instructors = await Instructor.findAll(condition)
    const { count, rows } = await Instructor.findAndCountAll(condition)

    success(res, '查询讲师列表成功', {
      instructors: rows,
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
 * 查询讲师详情(id)
 * GET /admin/instructors/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const instructor = await getInstructor(req)

    success(res,'查询讲师详情成功',{instructor})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建讲师
 * POST /admin/instructors
 */
router.post('/', async function (req, res,) {
  try {
    const instructor = await Instructor.create(req.body)

    success(res,'发送成功',{instructor},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除讲师
 * DELETE /admin/instructors/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const instructor = await getInstructor(req)


    await instructor.destroy()
    success(res,'删除讲师成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新讲师
 * PUT /admin/instructors/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const instructor = await getInstructor(req)

    await instructor.update(req.body)

    success(res,'更新讲师成功',{instructor})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前讲师
 */
async function getInstructor(req) {
  //获取讲师ID
  const { id } = req.params

  //查询当前讲师
  const instructor = await Instructor.findByPk(id)

  //如果没有找到就抛出异常
  if (!instructor) {
    throw new NotFoundError(`ID:${id}的讲师未找到`)
  }
  return instructor
}

module.exports = router;
