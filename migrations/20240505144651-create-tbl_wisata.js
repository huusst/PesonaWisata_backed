'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_Wisata', {
      id_wisata: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_desaWisata: {
        type: Sequelize.INTEGER
      },
      id_admin: {
        type: Sequelize.INTEGER
      },
      id_admin_verifed: {
        type: Sequelize.INTEGER
      },
      nama_destinasi: {
        type: Sequelize.STRING
      },
      nib_destinasi: {
        type: Sequelize.STRING
      },
      kbli_destinasi: {
        type: Sequelize.STRING
      },
      alamat_destinasi: {
        type: Sequelize.STRING
      },
      npwp_destinasi: {
        type: Sequelize.STRING
      },
      npwp_pemilik_destinasi: {
        type: Sequelize.STRING
      },
      desk_destinasi: {
        type: Sequelize.TEXT
      },
      maps_destinasi: {
        type: Sequelize.STRING
      },
      sampul_destinasi: {
        type: Sequelize.STRING
      },
      ruang_destinasi: {
        type: Sequelize.STRING
      },
      harga_tiket: {
        type: Sequelize.INTEGER
      },
      kontak_person_destinasi: {
        type: Sequelize.STRING
      },
      total_pengunjung_destinasi: {
        type: Sequelize.INTEGER
      }, 
      status_wisata: {
        type: Sequelize.ENUM('Pribadi', 'Bumdes', 'Pemda'),
      },
      status_verifikasi: {
        type: Sequelize.ENUM('verifed', 'unverifed'),
        defaultValue: 'unverifed'
      },
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
    await queryInterface.dropTable('tbl_Wisata');
  }
};