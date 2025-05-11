const express=require('express')
const router=express.Router()
const {success,failure} =require('../utils/response')
const { BadRequest } = require('../utils/errors')
const {singleFileUpload}=require('../utils/upload')

/**
 * POST /upload/image
 */
router.post('/image',function(req,res){
  try{
    singleFileUpload(req,res,function(error){
      if(error){
        return failure(res,error)
      }
      if(!req.file){
        return failure(res,new BadRequest('请选择要上传的文件'))
      }
      console.log(req.file)
      success(res,`上传成功,路径为：${req.file}`,{file:req.file})
    })
  }catch(error){
    failure(res,error)
  }
})

module.exports=router