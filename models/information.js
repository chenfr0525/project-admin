'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Information.belongsTo(models.Admin,{as:'admin'})
    }
  }
  Information.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    adminId: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'Information',
  });
  return Information;
};