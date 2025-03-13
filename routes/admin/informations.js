var express = require('express');
var router = express.Router();
const { Information } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询通知列表(模糊搜索)++所有
 * GET /admin/informations
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

    // const informations = await Information.findAll(condition)
    const { count, rows } = await Information.findAndCountAll(condition)

    success(res, '查询通知列表成功', {
      informations: rows,
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
 * 查询通知详情(id)
 * GET /admin/informations/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const information = await getInformation(req)

    success(res,'查询通知详情成功',{information})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建通知
 * POST /admin/informations
 */
router.post('/', async function (req, res,) {
  try {
    const information = await Information.create(req.body)

    success(res,'发送成功',{information},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除通知
 * DELETE /admin/informations/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const information = await getInformation(req)


    await information.destroy()
    success(res,'删除通知成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新通知
 * PUT /admin/informations/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const information = await getInformation(req)

    await information.update(req.body)

    success(res,'更新通知成功',{information})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前通知
 */
async function getInformation(req) {
  //获取通知ID
  const { id } = req.params

  //查询当前通知
  const information = await Information.findByPk(id)

  //如果没有找到就抛出异常
  if (!information) {
    throw new NotFoundError(`ID:${id}的通知未找到`)
  }
  return information
}

module.exports = router;
