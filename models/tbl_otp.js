'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_Otp.init({
    id_otp: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(50),
    },
    email_user: DataTypes.STRING,
    otp: DataTypes.STRING,
    expiryTime: DataTypes.DATE,
    // status_otp: {
    //   type: DataTypes.ENUM('active', 'non active', 'expired'),
    //   defaultValue: 'active'
    // },
  }, {
    sequelize,
    modelName: 'tbl_Otp',
  });
  return tbl_Otp;
};