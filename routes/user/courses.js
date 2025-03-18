var express = require('express');
var router = express.Router();
const { Course,Instructor } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')

/**
 * 查询课程列表(模糊搜索)++所有
 * GET /admin/courses
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query

    const condition = {
      ...getCondition(),
      order: [['id', 'DESC']]
    }

    //模糊条件
    condition.where=getLikeCourse(query)

    // const courses = await Course.findAll(condition)
    const { rows } = await Course.findAndCountAll(condition)

    success(res, '查询课程列表成功', {
      courses: rows
    })
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询课程详情(id)
 * GET /admin/courses/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const course = await getCourse(req)

    success(res,'查询课程详情成功',{course})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建课程
 * POST /admin/courses
 */
router.post('/', async function (req, res,) {
  try {
    const course = await Course.create(req.body)

    success(res,'发送成功',{course},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除课程
 * DELETE /admin/courses/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const course = await getCourse(req)


    await course.destroy()
    success(res,'删除课程成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新课程
 * PUT /admin/courses/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const course = await getCourse(req)

    await course.update(req.body)

    success(res,'更新课程成功',{course})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：关联分类
*/
function getCondition() {
  return {
    attributes: { exclude: ['instructorId'] },//排序大写ID
    include: [
      {
        model: Instructor,
        as: 'instructor',
        attributes: ['id', 'name','avatar_url','bio']
      }
    ]
  }
}

/**
 * 公共方法：查询当前课程
 */
async function getCourse(req) {
  //获取课程ID
  const { id } = req.params

  const condition = {
    ...getCondition()
  }

  //查询当前课程
  const course = await Course.findByPk(id,condition)

  //如果没有找到就抛出异常
  if (!course) {
    throw new NotFound(`ID:${id}的课程未找到`)
  }
  return course
}

/**
 * 公共方法：模糊查询
 */
function getLikeCourse(query) {
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
