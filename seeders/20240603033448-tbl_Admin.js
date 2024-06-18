'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345678', 10);
   
    return queryInterface.bulkInsert('tbl_Admin', [
      {
        nama_admin: 'Haasstt',
        email_admin: 'haasstt@gmail.com',
        password_admin: hashedPassword,
        role: "admin",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_dinas',
        email_admin: 'haassttDinas@gmail.com',
        password_admin: hashedPassword,
        role: "dinas",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_pengelola1',
        email_admin: 'haassttpengelol1a@gmail.com',
        password_admin: hashedPassword,
        role: "pengelola",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_pengelola2',
        email_admin: 'haassttpengelol2a@gmail.com',
        password_admin: hashedPassword,
        role: "pengelola",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_pengelola3',
        email_admin: 'haassttpengelol3a@gmail.com',
        password_admin: hashedPassword,
        role: "pengelola",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_pengelola4',
        email_admin: 'haassttpengelol4a@gmail.com',
        password_admin: hashedPassword,
        role: "pengelola",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
      {
        nama_admin: 'Haasstt_industri',
        email_admin: 'haassttindustri@gmail.com',
        password_admin: hashedPassword,
        role: "industri",
        nohp_admin: "0895359508913",
        alamat_admin: "Ds. Lebak Ayu Sawahan Madiun",
        sampul_admin: "default.jpg",
        status_akun: "aktif",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tbl_Admin', null, {});
  }
};
