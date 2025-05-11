var express = require('express');
var router = express.Router();
const { Student } = require('../../models')
const path = require('path');
const fs = require('fs');
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFound } = require('../../utils/errors')
const { success, failure } = require('../../utils/response')
const {singleFileUpload}=require('../../utils/upload')
//中间件
const studentAuth = require('../../middlewares/student-auth')

/**
 * 查询学生列表(模糊搜索)++所有
 * GET /user/students
 */
router.get('/', async function (req, res, next) {
  try {
    let query = req.query
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
      offset: offset,
      where:{}
    }

    for (let key in query) {
      if (key !== 'pageSize' && key !== 'currentPage') {
        if (query[key] != null && query[key] !== '') {
          if (key === 'username') {
            condition.where[key] = {
              [Op.like]: `%${query[key]}%`
            }
          }
          if (key === 'status' || key === 'phone') {
            condition.where[key] = query[key]
          }
          if (key === 'createdAt' && Array.isArray(query[key]) && query[key].length === 2) {
            condition.where[key] = {
              [Op.between]: [query[key][0], query[key][1]]
            };
          }
        }
      }
    }

    const { count, rows } = await Student.findAndCountAll(condition)

  success(res, '查询学生列表成功', {
    students: rows,
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
 * 查询学生详情
 * GET /user/students/me(学生端)
 */
router.get('/me', studentAuth, async function (req, res, next) {
  try {

    const body = req.body
    body.studentId = req.student.id

    //查询当前学生
    const student = await Student.findByPk(body.studentId)

    success(res, '查询学生详情成功', { student })
  } catch (error) {
    failure(res, error)
  }
})


/**
 * 查询学生详情（后台）
 * GET /user/students/:id
 */
router.get('/:id', async function (req, res, next) {
  try {

    const id = req.params.id
    //查询学生
    const student = await Student.findByPk(id)

    success(res, '查询学生详情成功', { student })
  } catch (error) {
    failure(res, error)
  }
})


/**
 * 创建学生
 * POST /user/students
 */
router.post('/', async function (req, res,) {
  try {
    const student = await Student.create(req.body)
    success(res, '发送成功', { student }, 201)
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 上传图片
 * POST /user/students/image
 */
router.post('/image',studentAuth,function(req,res){
  try{
    singleFileUpload(req,res,async function(error){
      if(error){
        return failure(res,error)
      }
      if(!req.file){
        return failure(res,new BadRequest('请选择要上传的文件'))
      }

      // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path); // 删除已上传的无效文件
      return failure(res, new BadRequest('只允许上传图片文件'));
    }

      // 图片的相对路径
     const imagePath = `uploads/${req.file.filename}`
     const student = await Student.findByPk(req.student.id)
     // 删除旧图片
    if (student.avatar) {
      try {
        const oldImagePath = path.join(__dirname, '../../public', student.avatar);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (err) {
        console.error('删除旧图片失败:', err);
        // 不阻止继续执行，记录错误即可
      }
    }

    await student.update({avatar:imagePath})
      success(res,`上传成功,路径为：${imagePath}`,{avatar:imagePath})
    })
  }catch(error){
     // 确保上传失败时删除临时文件
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    failure(res, error);
  }
})

/**
 * 删除学生
 * DELETE /user/students/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const idList = req.params.id.split(',')
    idList.forEach(async (id) => {
      req.params.id = id
      const student = await getStudent(req)
      await student.destroy()
    })
    success(res, '删除学生成功')
  } catch (error) {
    failure(res, error)
  }
})

/**
 * 更新学生
 * PUT /user/students/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const student = await getStudent(req)
    await student.update(req.body)

    success(res, '更新学生成功', { student })

  } catch (error) {
    failure(res, error)
  }
})




/**
 * 公共方法：查询当前学生
 */
async function getStudent(req) {
  //获取学生ID
  const { id } = req.params

  //查询当前学生
  const student = await Student.findByPk(id)

  //如果没有找到就抛出异常
  if (!student) {
    throw new NotFound(`ID:${id}的学生未找到`)
  }
  return student
}

/**
 * 公共方法：模糊查询学生
 */
function getLikeStudent(query) {
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
