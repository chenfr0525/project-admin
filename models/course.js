'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course.belongsTo(models.Instructor,{as:'instructor'})
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    instructorId: DataTypes.INTEGER,
    recommend: DataTypes.TINYINT,
    classic: DataTypes.TINYINT,
    type: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};