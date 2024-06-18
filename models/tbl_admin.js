'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_Admin extends Model {
    static associate(models) {
      // define association here
    }
  }
  tbl_Admin.init({
    id_admin: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_admin: {
      type: DataTypes.STRING
    },
    email_admin: {
      type: DataTypes.STRING
    },
    password_admin: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('admin', 'dinas', 'pengelola', 'industri')
    },
    nohp_admin: {
      type: DataTypes.STRING
    },
    alamat_admin: {
      type: DataTypes.STRING
    },
    sampul_admin: {
      type: DataTypes.STRING
    },
    status_akun: {
      type: DataTypes.ENUM('aktif', 'suspend'),
      defaultValue: 'aktif'
    },
  }, {
    sequelize,
    modelName: 'tbl_Admin',
    tableName: 'tbl_Admin',
  });
  return tbl_Admin;
};