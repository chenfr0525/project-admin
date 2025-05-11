const multer = require('multer')
const path = require('path');
const { BadRequest } = require('./errors')

//multer配置信息
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../public/uploads'))
},
filename:function(req,file,cb){
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // 获取文件扩展名
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // 生成唯一的文件名
}
});
//创建multer实例
const upload=multer({
  storage:storage,//使用本地存储引擎
  limits:{
    fileSize:5*1024*1024,//限制上传文件的大小为5MB
  },
  fileFilter:function(req,file,cb){
    //只允许上传图片
    const fileType=file.mimetype.split('/')[0]
    const isImage=fileType==='image'
    if(!isImage){
      return cb(new BadRequest('只允许上传图片'))
    }
    cb(null,true)
  }
  })

  //单文件上传，指定表单字段为file
  const singleFileUpload=upload.single('file')

  module.exports={
    singleFileUpload
  }