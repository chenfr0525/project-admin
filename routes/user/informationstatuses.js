var express = require('express');
var router = express.Router();
const { InformationStatus,Student,Information } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询学生信息状态列表(模糊搜索)++所有
 * GET /admin/informationstatuses
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
      offset: offset
    }

    condition.where=getLikeInformationStatue(query)

    // const informationstatuses = await InformationStatus.findAll(condition)
    const { count, rows } = await InformationStatus.findAndCountAll(condition)

    success(res, '查询学生信息状态列表成功', {
      informationstatuses: rows,
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
 * 查询学生信息状态详情(id)
 * GET /admin/informationstatuses/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const informationstatuse = await getInformationStatus(req)

    success(res,'查询学生信息状态详情成功',{informationstatuse})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建学生信息状态
 * POST /admin/informationstatuses
 */
router.post('/', async function (req, res,) {
  try {
    const informationstatuse = await InformationStatus.create(req.body)

    success(res,'发送成功',{informationstatuse},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除学生信息状态
 * DELETE /admin/informationstatuses/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const informationstatuse = await getInformationStatus(req)


    await informationstatuse.destroy()
    success(res,'删除学生信息状态成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新学生信息状态
 * PUT /admin/informationstatuses/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const informationstatuse = await getInformationStatus(req)

    await informationstatuse.update(req.body)

    success(res,'更新学生信息状态成功',{informationstatuse})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['informationId','studentId'] },//排序大写ID
    include: [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'username']
      },
      {
        model: Information,
        as: 'information',
        attributes: ['id', 'title','content','adminId']
      }
    ]
  }
}

/**
 * 公共方法：查询当前学生信息状态
 */
async function getInformationStatus(req) {
  //获取学生信息状态ID
  const { id } = req.params

  //查询当前学生信息状态
  const informationstatuse = await InformationStatus.findByPk(id)

  //如果没有找到就抛出异常
  if (!informationstatuse) {
    throw new NotFound(`ID:${id}的学生信息状态未找到`)
  }
  return informationstatuse
}

/**
 * 公共方法：模糊查询
 */
function getLikeInformationStatue(query) {
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
