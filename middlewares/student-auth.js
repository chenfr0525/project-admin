const jwt =require('jsonwebtoken')
const {Student}=require('../models')
const {Unauthorized}=require('../utils/errors')
const {success,failure}=require('../utils/response')

module.exports=async function(req,res,next){
  try{
    const {token}=req.headers
    if(!token){
      throw new Unauthorized('请先登录')
    }

    const decoded=jwt.verify(token,process.env.SECRET)

    const {studentId}=decoded

    const student=await Student.findByPk(studentId)
    if(!student){
      throw new Unauthorized('用户不存在')
    }
    req.student=student
    next()
  }catch(e){
    failure(res,e)
  }
}