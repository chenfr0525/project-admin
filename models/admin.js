'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:'名称已存在，请选择其他名称！'},
      validate:{
        notNull:{msg:'名称必须填写'},
        notEmpty:{msg:'名称不能为空'},
        len:{args:[2,45],msg:'长度必须是2~45之间'}
      }
    },
    phone: DataTypes.STRING,
    password:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'密码必须填写'},
        notEmpty:{msg:'名称不能为空'},
        len:{args:[2,45],msg:'长度必须是2~45之间'}
    },
  },
    address: DataTypes.STRING,
    gender: DataTypes.TINYINT,
    home_address: DataTypes.STRING,
    bio: DataTypes.TEXT,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};