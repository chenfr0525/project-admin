'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Student.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:'名称已存在，请选择其他名称！'},
      validate:{
        notNull:{msg:'名称必须填写'},
        notEmpty:{msg:'名称不能为空'},
        len:{args:[2,45],msg:'长度必须是2~45之间'}
      }
    },
    gender: DataTypes.TINYINT,
    birthdate: DataTypes.DATE,
    phone: DataTypes.STRING,
    password:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'密码必须填写'},
        notEmpty:{msg:'名称不能为空'}
    },
    set(value){
      if(value.length>=6 && value.length<=45){
        this.setDataValue('password',bcrypt.hashSync(value,10))
      }else{
        throw new Error('密码长度必须为6~45之间')
      }
    }
  },
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    school: DataTypes.STRING,
    bio: DataTypes.TEXT,
    avatar: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};