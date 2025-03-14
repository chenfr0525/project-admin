var express = require('express');
var router = express.Router();
const { MotivationalQuote } = require('../../models')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询激励语句列表(模糊搜索)++所有
 * GET /admin/motivationallquotes
 */
router.get('/', async function (req, res, next) {
  try {
    const motivationallquotes = await MotivationalQuote.findAll()
    success(res, '查询激励语句列表成功', {motivationallquotes})
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询激励语句详情(id)
 * GET /admin/motivationallquotes/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const motivationallquote = await getMotivationalQuote(req)

    success(res,'查询激励语句详情成功',{motivationallquote})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建激励语句
 * POST /admin/motivationallquotes
 */
router.post('/', async function (req, res,) {
  try {
    const motivationallquote = await MotivationalQuote.create(req.body)

    success(res,'发送成功',{motivationallquote},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除激励语句
 * DELETE /admin/motivationallquotes/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const motivationallquote = await getMotivationalQuote(req)


    await motivationallquote.destroy()
    success(res,'删除激励语句成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新激励语句
 * PUT /admin/motivationallquotes/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const motivationallquote = await getMotivationalQuote(req)

    await motivationallquote.update(req.body)

    success(res,'更新激励语句成功',{motivationallquote})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前激励语句
 */
async function getMotivationalQuote(req) {
  //获取激励语句ID
  const { id } = req.params

  //查询当前激励语句
  const motivationallquote = await MotivationalQuote.findByPk(id)

  //如果没有找到就抛出异常
  if (!motivationallquote) {
    throw new NotFoundError(`ID:${id}的激励语句未找到`)
  }
  return motivationallquote
}

module.exports = router;
