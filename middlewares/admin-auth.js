const jwt =require('jsonwebtoken')
const {Admin}=require('../models')
const {Unauthorized}=require('../utils/errors')
const {success,failure}=require('../utils/response')

module.exports=async function(req,res,next){
  try{
    const {token}=req.headers
    if(!token){
      throw new Unauthorized('请先登录')
    }

    const decoded=jwt.verify(token,process.env.SECRET)

    const {adminId}=decoded

    const admin=await Admin.findByPk(adminId)
    if(!admin){
      throw new Unauthorized('用户不存在')
    }
    req.admin=admin
    next()
  }catch(e){
    failure(res,e)
  }
}