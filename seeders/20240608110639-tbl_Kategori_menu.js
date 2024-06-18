'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tbl_Kategori_menu', [
      {
        id_kuliner: 1,
        id_admin: 7,
        nama_kategori_menu : "Makanan"
      },
      {
        id_kuliner: 2,
        id_admin: 7,
        nama_kategori_menu : "Makanan"
      },
      {
        id_kuliner: 3,
        id_admin: 7,
        nama_kategori_menu : "Makanan"
      },
      {
        id_kuliner: 1,
        id_admin: 7,
        nama_kategori_menu : "Minuman"
      },
      {
        id_kuliner: 2,
        id_admin: 7,
        nama_kategori_menu : "Minuman"
      },
      {
        id_kuliner: 3,
        id_admin: 7,
        nama_kategori_menu : "Minuman"
      },
      {
        id_kuliner: 1,
        id_admin: 7,
        nama_kategori_menu : "Snack"
      },
      {
        id_kuliner: 2,
        id_admin: 7,
        nama_kategori_menu : "Snack"
      },
      {
        id_kuliner: 3,
        id_admin: 7,
        nama_kategori_menu : "Snack"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('tbl_Kategori_menu', null, {});
  }
};
