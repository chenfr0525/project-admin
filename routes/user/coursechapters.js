var express = require('express');
var router = express.Router();
const { Coursechapter } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询章节列表(模糊搜索)++所有
 * GET /admin/coursechapters
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
    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${query.title}%`
        }
      }
    }

    // const coursechapters = await Coursechapter.findAll(condition)
    const { count, rows } = await Coursechapter.findAndCountAll(condition)

    success(res, '查询章节列表成功', {
      coursechapters: rows,
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
 * 查询章节详情(id)
 * GET /admin/coursechapters/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const coursechapter = await getCoursechapter(req)

    success(res,'查询章节详情成功',{coursechapter})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建章节
 * POST /admin/coursechapters
 */
router.post('/', async function (req, res,) {
  try {
    const coursechapter = await Coursechapter.create(req.body)

    success(res,'发送成功',{coursechapter},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除章节
 * DELETE /admin/coursechapters/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const coursechapter = await getCoursechapter(req)


    await coursechapter.destroy()
    success(res,'删除章节成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新章节
 * PUT /admin/coursechapters/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const coursechapter = await getCoursechapter(req)

    await coursechapter.update(req.body)

    success(res,'更新章节成功',{coursechapter})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前章节
 */
async function getCoursechapter(req) {
  //获取章节ID
  const { id } = req.params

  //查询当前章节
  const coursechapter = await Coursechapter.findByPk(id)

  //如果没有找到就抛出异常
  if (!coursechapter) {
    throw new NotFoundError(`ID:${id}的章节未找到`)
  }
  return coursechapter
}

module.exports = router;
