var express = require('express');
var router = express.Router();
const { Motivationallquote } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询激励语句列表(模糊搜索)++所有
 * GET /admin/motivationallquotes
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

    // const motivationallquotes = await Motivationallquote.findAll(condition)
    const { count, rows } = await Motivationallquote.findAndCountAll(condition)

    success(res, '查询激励语句列表成功', {
      motivationallquotes: rows,
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
 * 查询激励语句详情(id)
 * GET /admin/motivationallquotes/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const motivationallquote = await getMotivationallquote(req)

    success(res,'查询激励语句详情成功',{motivationallquote})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建激励语句
 * POST /admin/motivationallquotes
 */
router.post('/', async function (req, res,) {
  try {
    const motivationallquote = await Motivationallquote.create(req.body)

    success(res,'发送成功',{motivationallquote},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除激励语句
 * DELETE /admin/motivationallquotes/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const motivationallquote = await getMotivationallquote(req)


    await motivationallquote.destroy()
    success(res,'删除激励语句成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新激励语句
 * PUT /admin/motivationallquotes/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const motivationallquote = await getMotivationallquote(req)

    await motivationallquote.update(req.body)

    success(res,'更新激励语句成功',{motivationallquote})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前激励语句
 */
async function getMotivationallquote(req) {
  //获取激励语句ID
  const { id } = req.params

  //查询当前激励语句
  const motivationallquote = await Motivationallquote.findByPk(id)

  //如果没有找到就抛出异常
  if (!motivationallquote) {
    throw new NotFoundError(`ID:${id}的激励语句未找到`)
  }
  return motivationallquote
}

module.exports = router;
