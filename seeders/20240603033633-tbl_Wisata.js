'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tbl_Wisata', [
      {
        id_desaWisata: 1,
        id_admin: 3,
        id_admin_verifed: 2,
        nama_destinasi: 'Nongko Ijo',
        nib_destinasi: null,
        kbli_destinasi: null,
        alamat_destinasi: 'Kare, Kec. Kare, Kabupaten Madiun, Jawa Timur',
        npwp_destinasi: null,
        npwp_pemilik_destinasi: null,
        desk_destinasi: 'Hutan dengan pohon pinus yang masih rindang ditambah ada beberapa gazebo. Tiket masuknya sebesar Rp. 5.000 kalian sudah bisa menikmati segarnya udara. Disana juga terdapat warung yang bisa kalian nikmati jajanannya, dibawah pohon pinus ini terdapat sungai yang alirannya digunakan untuk PLTA. Terdapat dua PLTA yang berada di Desa Kare yaitu, PLTA Giringan di Desa Kepel dan PLTA Gulang di Desa Wiran.',
        maps_destinasi: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.514559832501!2d111.68221217484371!3d-7.7351142922833285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79afe6906b5b9b%3A0x596fc20d052be1ff!2sHutan%20Pinus%20NONGKO%20IJO!5e0!3m2!1sid!2sid!4v1716019800932!5m2!1sid!2sid',
        sampul_destinasi: 'http://localhost:3001/uploads/img/wisata/WisataNongkoIjo.png',
        ruang_destinasi: '',
        harga_tiket: 20000,
        kontak_person_destinasi: "0824324322432",
        status_wisata: 'Bumdes',
        status_verifikasi: 'verifed',
        total_pengunjung_destinasi: 30
      },
      {
        id_desaWisata: 1,
        id_admin: 3,
        id_admin_verifed: 2,
        nama_destinasi: 'Air Terjun Kertoembo',
        nib_destinasi: null,
        kbli_destinasi: null,
        alamat_destinasi: 'Sumberagung, Kec. Kare, Kabupaten Madiun, Jawa Timur 63182',
        npwp_destinasi: null,
        npwp_pemilik_destinasi: null,
        desk_destinasi: 'Jalan menuju sebuah hidden games tentunya tidak akan mudah, jalanan yang dilalu sangat menantang adrenalin terutama para adventur. Jalanan berupa aspal halus sejauh 2 km kemudian disusul jalan dengan track batu sejauh 3 km jalan menuju ke atas dapat dilaju dengan kendaraan roda 4. Masih dipenuhi perpohonan besar, perkebunan kopi milik masyarakat sekitar, serta jurang. Ternyata jalan menuju air terjun kertoimbo masih terdapat pemukiman masyarakat yang asri. Mata kalian akan dimanjakan dengan pepohonan besar yang menyegarkan dimata serta air terjun yang airnya sangat segar. Disekitar Air Terjun Kertoimbo masih terdapat perkebunan kopi yang dikelola oleh seorang Sindren, beliau tinggal disebuah rumah yang disebut lodjie rumah tersebut sudah ada sejak Zaman Belanda dan masih berdiri kokoh hingga saat ini.',
        maps_destinasi: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1084167655595!2d111.6977200748442!3d-7.778327892241246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79af0fdfc256ad%3A0xcff3bc8238b0c0c5!2sAir%20Terjun%20Kertoembo!5e0!3m2!1sid!2sid!4v1717391531697!5m2!1sid!2sid',
        sampul_destinasi: 'http://localhost:3001/uploads/img/wisata/WisataAirTerjunKertoimbo.png',
        ruang_destinasi: '',
        harga_tiket: 10000,
        kontak_person_destinasi: "0824324322432",
        status_wisata: 'Bumdes',
        status_verifikasi: 'verifed',
        total_pengunjung_destinasi: 25
      },
      {
        id_desaWisata: 1,
        id_admin: 3,
        id_admin_verifed: 2,
        nama_destinasi: 'Bumi Perkemahan Kandangan',
        nib_destinasi: null,
        kbli_destinasi: null,
        alamat_destinasi: 'Kandangan, Kare, Sweri, Kare, Kec. Kare, Kabupaten Madiun, Jawa Timur 63182',
        npwp_destinasi: null,
        npwp_pemilik_destinasi: null,
        desk_destinasi: 'Dusun Kandangan memiliki fasilitas berupa lapangan luas dengan rumput hijau disertai bangunan. Tempat ini sering digunakan untuk kegiatan perkemahan pramuka oleh anak sekolah, biasanya dari wilayah ponorogo dan pacitan.',
        maps_destinasi: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.3045143408913!2d111.69633037484397!3d-7.757492992261515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79afbad7e5e0f5%3A0x13234c3b2ded1588!2zQnVtaSBQZXJrZW1haGFuIEthbmRhbmdhbiAtIOqni-qmp-qmuOqmqeqmtuqmpeqmvOqmguqmj-qmuuqmqeqmsuqmpOqngOqmj-qmpOqngOqmneqmlOqmpOqngA!5e0!3m2!1sid!2sid!4v1717392401707!5m2!1sid!2sid',
        sampul_destinasi: 'http://localhost:3001/uploads/img/wisata/WisataBumiPerkemahan.png',
        ruang_destinasi: '',
        harga_tiket: 10000,
        kontak_person_destinasi: "0824324322432",
        status_wisata: 'Bumdes',
        status_verifikasi: 'verifed',
        total_pengunjung_destinasi: 10
      },
      {
        id_desaWisata: 1,
        id_admin: 3,
        id_admin_verifed: 2,
        nama_destinasi: 'Agro Wisata Perkebunan Kopi Kandangan',
        nib_destinasi: null,
        kbli_destinasi: null,
        alamat_destinasi: 'Kempo, Kare, Kec Kandangan, Kabupaten Madiun, Jawa Timur 63182',
        npwp_destinasi: null,
        npwp_pemilik_destinasi: null,
        desk_destinasi: 'Dusun Kandangan memiliki fasilitas berupa apangan luas dengan rumput hijau disertai bangunan. Tempat ini sering digunakan untuk kegiatan perkemahan pramuka oleh anak sekolah, biasanya dari wilayah ponorogo dan pacitan.',
        maps_destinasi: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2870997560863!2d111.69563199678953!3d-7.759345499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79af001195a93b%3A0x9f62a3cc62c1ed40!2sKantor%20PT.%20Perkebunan%20Kandangan!5e0!3m2!1sid!2sid!4v1717392303437!5m2!1sid!2sid',
        sampul_destinasi: 'http://localhost:3001/uploads/img/wisata/WisataPerkebunanKopi.png',
        ruang_destinasi: '',
        harga_tiket: 5000,
        kontak_person_destinasi: "0824324322432",
        status_wisata: 'Bumdes',
        status_verifikasi: 'verifed',
        total_pengunjung_destinasi: 25
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tbl_Wisata', null, {});
  }
};
