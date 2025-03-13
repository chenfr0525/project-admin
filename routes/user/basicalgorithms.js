titlevar express = require('express');
var router = express.Router();
const { Basicalgorithm } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询算法列表(模糊搜索)++所有
 * GET /admin/basicalgorithms
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

    // const basicalgorithms = await Basicalgorithm.findAll(condition)
    const { count, rows } = await Basicalgorithm.findAndCountAll(condition)

    success(res, '查询算法列表成功', {
      basicalgorithms: rows,
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
 * 查询算法详情(id)
 * GET /admin/basicalgorithms/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const basicalgorithm = await getBasicalgorithm(req)

    success(res,'查询算法详情成功',{basicalgorithm})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建算法
 * POST /admin/basicalgorithms
 */
router.post('/', async function (req, res,) {
  try {
    const basicalgorithm = await Basicalgorithm.create(req.body)

    success(res,'发送成功',{basicalgorithm},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除算法
 * DELETE /admin/basicalgorithms/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const basicalgorithm = await getBasicalgorithm(req)


    await basicalgorithm.destroy()
    success(res,'删除算法成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新算法
 * PUT /admin/basicalgorithms/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const basicalgorithm = await getBasicalgorithm(req)

    await basicalgorithm.update(req.body)

    success(res,'更新算法成功',{basicalgorithm})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前算法
 */
async function getBasicalgorithm(req) {
  //获取算法ID
  const { id } = req.params

  //查询当前算法
  const basicalgorithm = await Basicalgorithm.findByPk(id)

  //如果没有找到就抛出异常
  if (!basicalgorithm) {
    throw new NotFoundError(`ID:${id}的算法未找到`)
  }
  return basicalgorithm
}

module.exports = router;
