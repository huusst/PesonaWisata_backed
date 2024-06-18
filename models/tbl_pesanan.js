'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_pesanan.init({
    id_user: DataTypes.INTEGER,
    otp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_pesanan',
  });
  return tbl_pesanan;
};