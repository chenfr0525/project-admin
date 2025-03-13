var express = require('express');
var router = express.Router();
const { Plan } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询计划列表(模糊搜索)++所有
 * GET /admin/plans
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

    // const plans = await Plan.findAll(condition)
    const { count, rows } = await Plan.findAndCountAll(condition)

    success(res, '查询计划列表成功', {
      plans: rows,
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
 * 查询计划详情(id)
 * GET /admin/plans/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const plan = await getPlan(req)

    success(res,'查询计划详情成功',{plan})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建计划
 * POST /admin/plans
 */
router.post('/', async function (req, res,) {
  try {
    const plan = await Plan.create(req.body)

    success(res,'发送成功',{plan},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除计划
 * DELETE /admin/plans/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const plan = await getPlan(req)


    await plan.destroy()
    success(res,'删除计划成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新计划
 * PUT /admin/plans/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const plan = await getPlan(req)

    await plan.update(req.body)

    success(res,'更新计划成功',{plan})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前计划
 */
async function getPlan(req) {
  //获取计划ID
  const { id } = req.params

  //查询当前计划
  const plan = await Plan.findByPk(id)

  //如果没有找到就抛出异常
  if (!plan) {
    throw new NotFoundError(`ID:${id}的计划未找到`)
  }
  return plan
}

module.exports = router;
