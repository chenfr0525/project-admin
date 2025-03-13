var express = require('express');
var router = express.Router();

/**
 * get /users 获取所有用户数据
 * /users?num=123&&size=111
 */
router.get('/', function (req, res, next) {
  //参数
  console.log(req.query);
  //数据库操作
  //返回json数据
  res.json({
    code: 1,
    msg: '查询成功',
    data: [
      { id: 1, name: '李华' },
      { id: 2, name: 'Lisa' }
    ]
  })
});

/**
 * post /users 请求体 username password 新建用户
 */
router.post('/', function (req, res) {
  //请求参数
  console.log(req.body);
  //数据库操作
  //返回数据信息
  res.json({
    code: 1,
    msg: '创建成功',
    data: { name: 'pink' }
  })
})

/**
 * /users/:id 获取对应id的用户信息
 */
router.get('/:id', function (req, res) {
  //获取参数
  console.log(req.params)
  //数据库操作
  //返回数据
  res.json({
    code: 1,
    msg: '获取该用户信息成功',
    data: { name: 'pink' }
  })
})

/**
 * 更改密码
 * patch /users/:id 修改某一用户的信息
 */
router.patch('/:id', function (req, res) {
  //获取参数
  console.log(req.params)
  console.log(req.body)
  //数据库操作
  //返回数据
  res.json({
    code: 1,
    msg: '修改该用户信息成功',
    data: { id:'1',name: 'pink' }
  })
})

/**
 * delete删除 /users/:id 删除用户为id的信息
 */
router.delete('/:id', function (req, res) {
  //获取参数
  console.log(req.params)
  //数据库操作
  //返回数据
  res.json({
    code: 1,
    msg: 'id用户删除成功',
    data: { id:'1',name: 'pink' }
  })
})


module.exports = router;
