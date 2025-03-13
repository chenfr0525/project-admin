var express = require('express');
var router = express.Router();
const { Carouselimage } = require('../../models')
//模糊搜索需要
const { Op } = require('sequelize')
//错误类
const { NotFoundError, success,failure } = require('../../utils/response')

/**
 * 查询轮播图列表(模糊搜索)++所有
 * GET /admin/carouselimages
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

    // const carouselimages = await Carouselimage.findAll(condition)
    const { count, rows } = await Carouselimage.findAndCountAll(condition)

    success(res, '查询轮播图列表成功', {
      carouselimages: rows,
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
 * 查询轮播图详情(id)
 * GET /admin/carouselimages/:id
 */
router.get('/:id', async function (req, res, next) {
  try {
    const carouselimage = await getCarouselimage(req)

    success(res,'查询轮播图详情成功',{carouselimage})
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 创建轮播图
 * POST /admin/carouselimages
 */
router.post('/', async function (req, res,) {
  try {
    const carouselimage = await Carouselimage.create(req.body)

    success(res,'发送成功',{carouselimage},201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除轮播图
 * DELETE /admin/carouselimages/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const carouselimage = await getCarouselimage(req)


    await carouselimage.destroy()
    success(res,'删除轮播图成功')
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 更新轮播图
 * PUT /admin/carouselimages/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const carouselimage = await getCarouselimage(req)

    await carouselimage.update(req.body)

    success(res,'更新轮播图成功',{carouselimage})

  } catch (error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前轮播图
 */
async function getCarouselimage(req) {
  //获取轮播图ID
  const { id } = req.params

  //查询当前轮播图
  const carouselimage = await Carouselimage.findByPk(id)

  //如果没有找到就抛出异常
  if (!carouselimage) {
    throw new NotFoundError(`ID:${id}的轮播图未找到`)
  }
  return carouselimage
}

module.exports = router;
