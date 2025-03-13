'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformationStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InformationStatus.init({
    informationId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'InformationStatus',
  });
  return InformationStatus;
};