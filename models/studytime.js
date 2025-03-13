'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyTime.init({
    studentId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    duration: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'StudyTime',
  });
  return StudyTime;
};