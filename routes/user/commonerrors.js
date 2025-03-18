var express = require('express');
var router = express.Router();
const { CommonError } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询错误列表(模糊搜索)++所有
 * GET /admin/commonerrors
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query
    const condition = {
      order: [['id', 'DESC']]
    }

    //模糊条件
    condition.where=getLikeCommonError(query)

    // const commonerrors = await CommonError.findAll(condition)
    const {rows } = await CommonError.findAndCountAll(condition)

    success(res, '查询错误列表成功', {
      commonerrors: rows,
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
    const commonerror = await getCommonError(req)

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
    const commonerror = await CommonError.create(req.body)

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
    const commonerror = await getCommonError(req)


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
    const commonerror = await getCommonError(req)

    await commonerror.update(req.body)

    success(res,'更新错误成功',{commonerror})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前错误
 */
async function getCommonError(req) {
  //获取错误ID
  const { id } = req.params

  //查询当前错误
  const commonerror = await CommonError.findByPk(id)

  //如果没有找到就抛出异常
  if (!commonerror) {
    throw new NotFound(`ID:${id}的错误未找到`)
  }
  return commonerror
}

/**
 * 公共方法：模糊查询
 */
function getLikeCommonError(query) {
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
