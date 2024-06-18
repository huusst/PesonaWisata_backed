'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tbl_fasilitas_paket_homestay', [
      {
        id_paket_homestay: 1,
        nama_fasilitas_paket: 'Terdapat 4 kamar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 1,
        nama_fasilitas_paket: '3 Kamar mandi (1 dalam)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 1,
        nama_fasilitas_paket: 'Garasi mobil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 1,
        nama_fasilitas_paket: 'Free Wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 2,
        nama_fasilitas_paket: 'Terdapat 4 kamar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 2,
        nama_fasilitas_paket: '3 Kamar mandi (1 dalam)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 2,
        nama_fasilitas_paket: 'Garasi mobil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 2,
        nama_fasilitas_paket: 'Free Wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_paket_homestay: 2,
        nama_fasilitas_paket: 'Sarapan dan Makan Siang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_fasilitas_paket_homestay', null, {});
  }
};
