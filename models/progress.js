'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Progress.belongsTo(models.PlanCourse,{as:'plancourse'})
    }
  }
  Progress.init({
    plancourseId: DataTypes.INTEGER,
    progress: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Progress',
  });
  return Progress;
};