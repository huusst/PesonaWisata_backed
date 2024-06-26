'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_pembayaran.init({
    id_user: DataTypes.INTEGER,
    otp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_pembayaran',
  });
  return tbl_pembayaran;
};