/**
 * 请求成功
 * @param res
 * @param message
 * @param data
 * @param code
 */
function success(res,message,data,code=200){
  res.status(code).json({
    status:200,
    message,
    data
  })
}

/**
 * 请求失败
 * @param res
 * @param error
 */
function failure(res,error){
  if(error.name==='SequelizeUniqueConstraintError'){
    const errors=error.errors.map(e=>e.message)
    return res.status(400).json({
      status:400,
      message:'请求参数错误',
      errors
    })
  }

  if(error.name==='BadRequest'){
    return res.status(400).json({
      status:400,
      message:'请求参数错误',
      errors:[error.message]
    })
  }

  if(error.name==='Unauthorized'){
    return res.status(401).json({
      status:401,
      message:'认证失败',
      errors:[error.message]
    })
  }

  if(error.name==='JsonWebTokenError'){
    return res.status(401).json({
      status:401,
      message:'认证失败',
      errors:['你提交的token错误']
    })
  }

  if(error.name==='TokenExpiredError'){
    return res.status(401).json({
      status:401,
      message:'认证失败',
      errors:['你的token已过期']
    })
  }

  if(error.name==='NotFound'){
    return res.status(404).json({
      status:404,
      message:'资源不存在',
      errors:[error.message]
    })
  }

  res.status(500).json({
    status:500,
    message:'服务器错误',
    errors:[error.message]
  })
}

module.exports={
  success,
  failure
}