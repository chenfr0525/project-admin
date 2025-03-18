var express = require('express');
var router = express.Router();
const {BasicAlgorithm} = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询算法列表(模糊搜索)++所有
 * GET /user/algorithms
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query
    const condition = {
      order: [['id', 'DESC']]
    }

    //模糊条件
    condition.where=getLikeAlgorithm(query)

    // const basicalgorithms = await BasicAlgorithm.findAll(condition)
    const {rows } = await BasicAlgorithm.findAndCountAll(condition)

    success(res, '查询算法列表成功', {
      basicalgorithms: rows
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
    const basicalgorithm = await getBasicAlgorithm(req)

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
    const basicalgorithm = await BasicAlgorithm.create(req.body)

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
    const basicalgorithm = await getBasicAlgorithm(req)


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
    const basicalgorithm = await getBasicAlgorithm(req)

    await basicalgorithm.update(req.body)

    success(res,'更新算法成功',{basicalgorithm})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前算法
 */
async function getBasicAlgorithm(req) {
  //获取算法ID
  const { id } = req.params

  //查询当前算法
  const basicalgorithm = await BasicAlgorithm.findByPk(id)

  //如果没有找到就抛出异常
  if (!basicalgorithm) {
    throw new NotFound(`ID:${id}的算法未找到`)
  }
  return basicalgorithm
}

/**
 * 公共方法：模糊查询算法
 */
function getLikeAlgorithm(query) {
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
