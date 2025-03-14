var express = require('express');
var router = express.Router();
const { Remend } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询推荐列表(模糊搜索)++所有
 * GET /admin/remends
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query
    const condition = {
      order: [['id', 'DESC']]
    }

    //模糊条件
    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`
        }
      }
    }

    // const remends = await Remend.findAll(condition)
    const { count, rows } = await Remend.findAndCountAll(condition)

    success(res, '查询推荐列表成功', {
      remends: rows
    })
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询推荐详情(id)
 * GET /admin/remends/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const remend = await getRemend(req)

    success(res,'查询推荐详情成功',{remend})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建推荐
 * POST /admin/remends
 */
router.post('/', async function (req, res,) {
  try {
    const remend = await Remend.create(req.body)

    success(res,'发送成功',{remend},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除推荐
 * DELETE /admin/remends/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const remend = await getRemend(req)


    await remend.destroy()
    success(res,'删除推荐成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新推荐
 * PUT /admin/remends/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const remend = await getRemend(req)

    await remend.update(req.body)

    success(res,'更新推荐成功',{remend})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前推荐
 */
async function getRemend(req) {
  //获取推荐ID
  const { id } = req.params

  //查询当前推荐
  const remend = await Remend.findByPk(id)

  //如果没有找到就抛出异常
  if (!remend) {
    throw new NotFoundError(`ID:${id}的推荐未找到`)
  }
  return remend
}

module.exports = router;
