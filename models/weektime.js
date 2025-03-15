'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeekTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WeekTime.belongsTo(models.Student,{as:'student'})
    }
  }
  WeekTime.init({
    studentId: DataTypes.INTEGER,
    weekStart: DataTypes.DATE,
    monday: DataTypes.TIME,
    tuesday: DataTypes.TIME,
    wednesday: DataTypes.TIME,
    thursday: DataTypes.TIME,
    friday: DataTypes.TIME,
    saturday: DataTypes.TIME,
    sunday: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'WeekTime',
  });
  return WeekTime;
};