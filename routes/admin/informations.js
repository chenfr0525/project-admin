var express = require('express');
var router = express.Router();
const { Information, Admin } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFound } = require('../../utils/errors')
const { success, failure } = require('../../utils/response')
const adminAuth=require('../../middlewares/admin-auth')

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
      ...getCondition(),
      order: [['id', 'DESC']],
      limit: pageSize,
      offset: offset,
      where: {}
    }
    //查询当前管理员
    if (query.username!=null&&query.username!=='') {
      const adminList = await Admin.findAll({ where: { username:{[Op.like]: `%${query.username}%`} } })
      const idList=adminList.map((item)=>{return item.id})
      condition.where.adminId={
        [Op.in]: idList
      }
    }

    //模糊条件
    for (let key in query) {
      if (key !== 'pageSize' && key !== 'currentPage' && key != 'username') {
        if (query[key] != null && query[key] !== '') {
          condition.where[key] = {
            [Op.like]: `%${query[key]}%`
          }
        }
      }
    }

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
    failure(res, error)
  }
});

/**
 * 查询通知详情(id)
 * GET /admin/informations/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const information = await getInformation(req)

    success(res, '查询通知详情成功', { information })
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 创建通知
 * POST /admin/informations
 */
router.post('/',adminAuth, async function (req, res,) {
  try {
    const body = req.body
    body.adminId = req.admin.id

    const information = await Information.create(body)

    success(res, '发送成功', { information }, 201)
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 删除通知
 * DELETE /admin/informations/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const idList = req.params.id.split(',')
    idList.forEach(async (id) => {
      req.params.id = id
      const information = await getInformation(req)
      await information.destroy()
    })
    success(res, '删除通知成功')
  } catch (error) {
    failure(res, error)
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

    success(res, '更新通知成功', { information })

  } catch (error) {
    failure(res, error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['adminId'] },//排序大写ID
    include: [
      {
        model: Admin,
        as: 'admin',
        attributes: ['id', 'username']
      }
    ]
  }
}

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
    throw new NotFound(`ID:${id}的通知未找到`)
  }
  return information
}

/**
 * 公共方法：模糊查询
 */
function getLikeInformation(query) {
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
