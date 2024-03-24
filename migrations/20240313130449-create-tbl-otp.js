'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_Otps', {
      id_otp: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_user: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      expiryTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // status_otp: {
      //   type: Sequelize.ENUM('active', 'non active', 'expired'),
      //   defaultValue: 'active'
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_Otps');
  }
};