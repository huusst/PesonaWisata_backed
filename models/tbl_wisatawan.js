'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_Wisatawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_Wisatawan.init({
    id_wisatawan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(50),
    },
    name: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // status_email: {
    //   type: DataTypes.ENUM('active', 'non active'),
    //   defaultValue: 'non active'
    // },
  }, {
    sequelize,
    modelName: 'tbl_Wisatawan',
  });
  return tbl_Wisatawan;
};