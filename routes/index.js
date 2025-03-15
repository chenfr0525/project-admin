var express = require('express');
var router = express.Router();
const { Student } = require('../../models')

//错误类
const {NotFound, BadRequest, Unauthorized}=require('../../utils/errors')
const {success,failure } = require('../../utils/response')


/**
 * 首页
 * GET 
 */
router.post('/', async function (req, res, next) {
  try{
    
  }catch(error){
    failure(res,error)
  }
});

module.exports = router;
