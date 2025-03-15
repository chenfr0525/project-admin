var express = require('express');
var router = express.Router();
const { Admin } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const {NotFound, BadRequest, Unauthorized}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


/**
 * 登陆验证
 * POST /admin/auth/login
 */
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body
    if(!username||!password){
      throw new BadRequest('用户名或密码不能为空')
    }
    //查询数据库是否存在该用户
    const admin = await Admin.findOne({
      where: {
        username
      }
    })
    //如果不存在该用户，则抛出错误
    if (!admin) {
      throw new NotFound('用户不存在')
    }

    //比较密码是否正确
    const isPasswordValid = bcrypt.compareSync(password, admin.password)
    if (!isPasswordValid) {
      throw new Unauthorized('密码错误')
    }

    //生成token
    const token = jwt.sign({
      adminId: admin.id,
    },process.env.SECRET,{expiresIn:'30d'})

   
    success(res, '登陆成功', { admin,token })
  }
  catch (error) {
    failure(res,error)
  }
});

module.exports = router;
