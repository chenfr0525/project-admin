var express = require('express');
var router = express.Router();
const { Plan, Student } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFound } = require('../../utils/errors')
const { success, failure } = require('../../utils/response')

/**
 * 查询计划详情
 * GET /admin/plans
 */
router.get('/', async function (req, res, next) {
  try {
    const id = req.student.id
    const plan = await Plan.findOne({
      where: {
        StudentId: id
      }
    })
    success(res, '查询计划详情成功', { plan })
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 创建计划
 * POST /admin/plans
 */
router.post('/', async function (req, res,) {
  try {
    const body = req.body
    body.studentId = req.student.id
    const plan = await Plan.create(body)

    success(res, '创建计划成功', { plan }, 201)
  } catch (error) {
    failure(res, error)
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
    success(res, '删除计划成功')
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 更新计划
 * PUT /admin/plans/:id
 */
router.put('/', async function (req, res) {
  try {

    const id = req.student.id

    //查询当前计划
    const plan = await Plan.findOne({
      where: {
        StudentId: id
      }
    })

    //如果没有找到就抛出异常
    if (!plan) {
      throw new NotFound(`ID:${id}的计划未找到`)
    }


    await plan.update(req.body)

    success(res, '更新计划成功', { plan })

  } catch (error) {
    failure(res, error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['StudentId'] },//排序大写ID
    include: [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'username']
      }
    ]
  }
}

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
    throw new NotFound(`ID:${id}的计划未找到`)
  }
  return plan
}

/**
 * 公共方法：模糊查询
 */
function getLikePlan(query) {
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
