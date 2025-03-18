var express = require('express');
var router = express.Router();
const { Information, WeekTime,Student } = require('../../models')
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');

//错误类
const { success, failure } = require('../../utils/response');


/**
 * 管理员首页
 * GET 
 */
router.get('/', async function (req, res, next) {
  try {
    //学生总人数
    const studentTotal = await Student.count()

    //信息数量
    const informationTotal = await Information.count()

    // 获取今天是星期几（0: 周日, 1: 周一, ..., 6: 周六）
    const todayDayOfWeek = moment().day();
    // 获取昨天是星期几
    const yesterdayDayOfWeek = moment().subtract(1, 'day').day()

    // 一周上线人数charts
    // 映射星期几到字段名
    const dayToFieldMap = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday'
    };

    // 获取今日上线人数
    const todayOnlineCount = await WeekTime.count({
      where: {
        [dayToFieldMap[todayDayOfWeek]]: {
          [Op.gt]: '00:00:00' // 确保今日在线时长大于 00:00:00
        }
      }
    });

    // 获取昨日上线人数
    const yesterdayOnlineCount = await WeekTime.count({
      where: {
        [dayToFieldMap[yesterdayDayOfWeek]]: {
          [Op.gt]: '00:00:00' // 确保昨日在线时长大于 00:00:00
        }
      }
    });

    // 获取一周每天的在线人数
    const getWeeklyOnlineCounts = async () => {
      const weeklyOnlineCounts = [];
      const weekStart = moment().startOf('week').format('YYYY-MM-DD'); // 本周的第一天（周日）

      for (let day = 0; day < 7; day++) {
        const fieldName = dayToFieldMap[day]; // 获取对应的字段名
        const count = await WeekTime.count({
          where: {
            [fieldName]: {
              [Op.gt]: '00:00:00' // 确保当天在线时长大于 00:00:00
            },
            weekStart: weekStart // 过滤本周的数据
          }
        });

        // 将结果按天存储
        weeklyOnlineCounts.push({
          date: moment().startOf('week').add(day, 'days').format('YYYY-MM-DD'), // 日期
          count: count // 在线人数
        });
      }

      return weeklyOnlineCounts;
    };
    const weeklyOnlineCounts = await getWeeklyOnlineCounts();

    // 获取今日的起始和结束时间
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    // 获取昨日的起始和结束时间
    const yesterdayStart = moment().subtract(1, 'day').startOf('day').toDate();
    const yesterdayEnd = moment().subtract(1, 'day').endOf('day').toDate();

    // 获取今日发布的信息数
    const todayInfoCount = await Information.count({
      where: {
        createdAt: {
          [Op.between]: [todayStart, todayEnd] // 过滤今日的日期范围
        }
      }
    });

    // 获取昨日发布的信息数
    const yesterdayInfoCount = await Information.count({
      where: {
        createdAt: {
          [Op.between]: [yesterdayStart, yesterdayEnd] // 过滤昨日的日期范围
        }
      }
    });

    //发布的信息
    const informations = await Information.findAll({where:{status:1}})

    success(res, '获取首页信息成功', {studentTotal,informationTotal, weeklyOnlineCounts, todayOnlineCount, yesterdayOnlineCount,todayInfoCount,yesterdayInfoCount ,informations})
  } catch (error) {
    failure(res, error)
  }
});

module.exports = router;
