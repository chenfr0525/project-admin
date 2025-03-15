var express = require('express');
var router = express.Router();
const { Progress,PlanCourse } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询学习进度列表(模糊搜索)++所有
 * GET /admin/progresses
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

    condition.where=getLikeProgress(query)

    // const progresses = await Progress.findAll(condition)
    const { count, rows } = await Progress.findAndCountAll(condition)

    success(res, '查询学习进度列表成功', {
      progresses: rows,
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
 * 查询学习进度详情(id)
 * GET /admin/progresses/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const progresse = await getProgress(req)

    success(res,'查询学习进度详情成功',{progresse})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建学习进度
 * POST /admin/progresses
 */
router.post('/', async function (req, res,) {
  try {
    const progresse = await Progress.create(req.body)

    success(res,'发送成功',{progresse},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除学习进度
 * DELETE /admin/progresses/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const progresse = await getProgress(req)


    await progresse.destroy()
    success(res,'删除学习进度成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新学习进度
 * PUT /admin/progresses/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const progresse = await getProgress(req)

    await progresse.update(req.body)

    success(res,'更新学习进度成功',{progresse})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['plancourseId'] },//排序大写ID
    include: [
      {
        model: PlanCourse,
        as: 'plancourse',
        attributes: ['id', 'planid','courseid']
      }
    ]
  }
}

/**
 * 公共方法：查询当前学习进度
 */
async function getProgress(req) {
  //获取学习进度ID
  const { id } = req.params

  //查询当前学习进度
  const progresse = await Progress.findByPk(id)

  //如果没有找到就抛出异常
  if (!progresse) {
    throw new NotFound(`ID:${id}的学习进度未找到`)
  }
  return progresse
}

/**
 * 公共方法：模糊查询
 */
function getLikeProgress(query) {
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
