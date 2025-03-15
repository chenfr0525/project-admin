var express = require('express');
var router = express.Router();
const { Admin } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询管理员列表(模糊搜索)++所有
 * GET /admin/admins
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
    condition.where=getLikeAdmin(query)

    // const admins = await Admin.findAll(condition)
    const { count, rows } = await Admin.findAndCountAll(condition)

    success(res, '查询管理员列表成功', {
      admins: rows,
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
 * 查询管理员详情(id)
 * GET /admin/admins/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const admin = await getAdmin(req)

    success(res,'查询管理员详情成功',{admin})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建管理员
 * POST /admin/admins
 */
router.post('/', async function (req, res,) {
  try {
    const admin = await Admin.create(req.body)

    success(res,'发送成功',{admin},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除管理员
 * DELETE /admin/admins/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const admin = await getAdmin(req)


    await admin.destroy()
    success(res,'删除管理员成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新管理员
 * PUT /admin/admins/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const admin = await getAdmin(req)

    await admin.update(req.body)

    success(res,'更新管理员成功',{admin})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前管理员
 */
async function getAdmin(req) {
  //获取管理员ID
  const { id } = req.params

  //查询当前管理员
  const admin = await Admin.findByPk(id)

  //如果没有找到就抛出异常
  if (!admin) {
    throw new NotFound(`ID:${id}的管理员未找到`)
  }
  return admin
}

/**
 * 公共方法：模糊查询
 */
function getLikeAdmin(query) {
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
