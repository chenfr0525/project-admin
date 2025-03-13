var express = require('express');
var router = express.Router();
const { Commonerror } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询错误列表(模糊搜索)++所有
 * GET /admin/commonerrors
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

    // const commonerrors = await Commonerror.findAll(condition)
    const { count, rows } = await Commonerror.findAndCountAll(condition)

    success(res, '查询错误列表成功', {
      commonerrors: rows,
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
 * 查询错误详情(id)
 * GET /admin/commonerrors/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const commonerror = await getCommonerror(req)

    success(res,'查询错误详情成功',{commonerror})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建错误
 * POST /admin/commonerrors
 */
router.post('/', async function (req, res,) {
  try {
    const commonerror = await Commonerror.create(req.body)

    success(res,'发送成功',{commonerror},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除错误
 * DELETE /admin/commonerrors/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const commonerror = await getCommonerror(req)


    await commonerror.destroy()
    success(res,'删除错误成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新错误
 * PUT /admin/commonerrors/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const commonerror = await getCommonerror(req)

    await commonerror.update(req.body)

    success(res,'更新错误成功',{commonerror})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前错误
 */
async function getCommonerror(req) {
  //获取错误ID
  const { id } = req.params

  //查询当前错误
  const commonerror = await Commonerror.findByPk(id)

  //如果没有找到就抛出异常
  if (!commonerror) {
    throw new NotFoundError(`ID:${id}的错误未找到`)
  }
  return commonerror
}

module.exports = router;
