'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     models.PlanCourse.belongsTo(models.Course,{as:'course'})
     models.PlanCourse.belongsTo(models.Plan,{as:'plan'})
    }
  }
  PlanCourse.init({
    courseId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlanCourse',
  });
  return PlanCourse;
};