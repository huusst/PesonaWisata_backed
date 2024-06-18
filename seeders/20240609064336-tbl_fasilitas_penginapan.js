'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tbl_fasilitas_utama_penginapan', [
      {
        id_penginapan: 1,
        fasilitas: 'air_condisioner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'restaurant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'parking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'lift',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'gym',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: 'swim',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 1,
        fasilitas: '24hour_resepionis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'air_condisioner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'restaurant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'parking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'lift',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: 'swim',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 2,
        fasilitas: '24hour_resepionis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: 'air_condisioner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: 'restaurant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: 'parking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: 'lift',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: 'wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 3,
        fasilitas: '24hour_resepionis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 4,
        fasilitas: 'parking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_penginapan: 4,
        fasilitas: 'wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_fasilitas_utama_penginapan', null, {});
  }
};
