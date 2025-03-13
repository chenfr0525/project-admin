var express = require('express');
var router = express.Router();
const { Article } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询文章列表(模糊搜索)++所有
 * GET /admin/articles
 */
router.get('/', async function (req, res, next) {
  try {
    //模糊查询
    const query = req.query

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
      offset: offset
    }

    //模糊条件
    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${query.title}%`
        }
      }
    }

    // const articles = await Article.findAll(condition)
    const { count, rows } = await Article.findAndCountAll(condition)

    success(res, '查询文章列表成功', {
      articles: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize
      }
    })
  }
  catch (error) {
    failure(res,error)
  }
});

/**
 * 查询文章详情(id)
 * GET /admin/articles/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const article = await getArticle(req)

    success(res,'查询文章详情成功',{article})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建文章
 * POST /admin/articles
 */
router.post('/', async function (req, res,) {
  try {
    const article = await Article.create(req.body)

    success(res,'发送成功',{article},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除文章
 * DELETE /admin/articles/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const article = await getArticle(req)


    await article.destroy()
    success(res,'删除文章成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新文章
 * PUT /admin/articles/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const article = await getArticle(req)

    await article.update(req.body)

    success(res,'更新文章成功',{article})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前文章
 */
async function getArticle(req) {
  //获取文章ID
  const { id } = req.params

  //查询当前文章
  const article = await Article.findByPk(id)

  //如果没有找到就抛出异常
  if (!article) {
    throw new NotFoundError(`ID:${id}的文章未找到`)
  }
  return article
}

module.exports = router;
