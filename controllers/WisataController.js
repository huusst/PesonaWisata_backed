const db = require('../models');
const tbl_Wisata = db.tbl_Wisata;
const Sequelize = require('sequelize');
const { Op, fn, col } = require('sequelize');


const get_recomendasi_wisata = async (req, res) => {
  try {
    const {
      dana,
      jumlah,
    } = req.body;

    if (!dana) {
      return res.status(400).send({ error: "Dana is required" });
    }

    const data = await tbl_Wisata.findAndCountAll({});

    if (data.count === 0) {
      return res.status(422).json({
        success: false,
        message: "Data Tidak Ditemukan",
        data: null,
      });
    }

    const weights = [0.3, 0.7];

    function normalizeMatrix(matrix) {
      let normalized = [];
      let minC1 = Math.min(...matrix.map(row => row[0]));
      let maxC2 = Math.max(...matrix.map(row => row[1]));

      for (let row of matrix) {
        let normalizedRow = [
          minC1 / row[0],
          row[1] / maxC2
        ];
        normalized.push(normalizedRow);
      }
      return normalized;
    }

    function calculatePreferences(matrix, weights) {
      let normalizedMatrix = normalizeMatrix(matrix);
      let preferenceValues = normalizedMatrix.map(row => {
        return row.reduce((acc, val, idx) => acc + (val * weights[idx]), 0);
      });
      return preferenceValues;
    }


    let filteredData = data.rows.filter(d => {
      let totalHarga = d.harga_tiket * jumlah;
      return totalHarga <= dana;
    });

    if (filteredData.length === 0) {
      return res.status(404).send({ error: "Tidak ada destinasi sesuai budget Anda" });
    }

    let matrix = filteredData.map(d => [d.harga_tiket, d.total_pengunjung_destinasi]);
    let preferenceValues = calculatePreferences(matrix, weights);

    let destinations = filteredData.map((dest, index) => ({
      ...dest.dataValues,
      recommended: index === preferenceValues.indexOf(Math.max(...preferenceValues)),
      preferenceValue: preferenceValues[index]
  }));

  // Urutkan berdasarkan preferenceValue tertinggi ke terendah
  destinations.sort((a, b) => b.preferenceValue - a.preferenceValue);

    const result = {
      success: true,
      message: "Sukses mendapatkan rekomendasi",
      data: destinations

    };

    res.status(200).json(result);

  } catch (error) {
    console.log(error, 'Data Error');
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    });
  }

}

const get_all_wisata = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      keyword = '',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {
      [Op.and]: [
        { status_verifikasi: 'verifed' },
        keyword ? {
          [Op.or]: [
            { nama_desaWisata: { [Op.like]: `%${keyword}%` } },
            { desk_desaWisata: { [Op.like]: `%${keyword}%` } },
          ]
        } : {}
      ]
    };

    const orderClause = [
      ['total_pengunjung_destinasi', order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']
    ];


    const data = await tbl_Wisata.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: offset,
      order: orderClause
    });

    const totalPages = limit ? Math.ceil(data.count / (limit || 1)) : 1;
    if (data.count === 0) {
      return res.status(422).json({
        success: false,
        message: "Data Tidak Ditemukan",
        data: null,
        pages: {
          total: 0,
          per_page: limit || 0,
          next_page: null,
          to: 0,
          last_page: 0,
          current_page: page || 1,
          from: 0,
        },
      });
    }

    const result = {
      success: true,
      message: "Sukses mendapatkan data",
      data: data.rows.map((items) => ({
        id: items.id_wisata,
        nama: items.nama_destinasi,
        kategori: "Wisata",
        harga: items.harga_tiket,
        pengunjung: items.total_pengunjung_destinasi,
        imageUrl: items.sampul_destinasi,
      })),
      pages: {
        total: data.count,
        per_page: parseInt(limit, 10) || data.count,
        next_page: limit && page ? (page < totalPages ? page + 1 : null) : null,
        to: limit ? offset + data.rows.length : data.count,
        last_page: totalPages,
        current_page: parseInt(page, 10) || 1,
        from: offset,
      },

    };

    const currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const excludePagesUrl = "http://localhost:3001/api/desawisata/get_all";

    if (currentUrl === excludePagesUrl) {
      delete result.pages;
    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error, 'Data Error');
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    });
  }
};


const get_detail_wisata = async (req, res) => {
  try {
    const { id_wisata } = req.params;

    if (!id_wisata) {
      return res.status(400).send({ error: "id_wisata is required" });
    }

    const data = await tbl_Wisata.findOne({
      where: {
        id_wisata,
      },
    });

    if (!data) {
      return res.status(422).json({
        success: false,
        message: "Data Tidak Ditemukan",
        data: null
      });
    }
    
    const result = {
      success: true,
      message: "Sukses mendapatkan data",
      data: [{
        id: data.id_wisata,
        nama: data.nama_destinasi,
        deskripsi: data.desk_destinasi,
        harga: data.harga_tiket,
        alamat: data.alamat_destinasi,
        link_iframe: data.maps_destinasi,
        imageUrl: data.sampul_destinasi,
      }],
      
    };

    res.status(200).json(result);

  } catch (error) {
    console.log(error, 'Data Error');
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    });
  }
};

const get_all_wisata_byDesawisata = async (req, res) => {
  try {
    const { id_desaWisata } = req.params;

    if (!id_desaWisata) {
      return res.status(400).send({ error: "id_desawisata is required" });
    }

    const {
      limit = 10,
      page = 1,
      keyword = '',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {
      [Op.and]: [
        { id_desaWisata },
        { status_verifikasi: 'verifed' },
        keyword ? {
          [Op.or]: [
            { nama_desaWisata: { [Op.like]: `%${keyword}%` } },
            { desk_desaWisata: { [Op.like]: `%${keyword}%` } },
          ]
        } : {}
      ]
    };

    const orderClause = [
      ['total_pengunjung_destinasi', order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']
    ];


    const data = await tbl_Wisata.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: offset,
      order: orderClause
    });

    const totalPages = limit ? Math.ceil(data.count / (limit || 1)) : 1;
    if (data.count === 0) {
      return res.status(422).json({
        success: false,
        message: "Data Tidak Ditemukan",
        data: null,
        pages: {
          total: 0,
          per_page: limit || 0,
          next_page: null,
          to: 0,
          last_page: 0,
          current_page: page || 1,
          from: 0,
        },
      });
    }

    const result = {
      success: true,
      message: "Sukses mendapatkan data",
      data: data.rows.map((items) => ({
        id: items.id_wisata,
        nama: items.nama_destinasi,
        kategori: "Wisata",
        harga: items.harga_tiket,
        imageUrl: items.sampul_destinasi,
      })),
      pages: {
        total: data.count,
        per_page: parseInt(limit, 10) || data.count,
        next_page: limit && page ? (page < totalPages ? page + 1 : null) : null,
        to: limit ? offset + data.rows.length : data.count,
        last_page: totalPages,
        current_page: parseInt(page, 10) || 1,
        from: offset,
      },

    };

    const currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const excludePagesUrl = "http://localhost:3001/api/desawisata/get_all";

    if (currentUrl === excludePagesUrl) {
      delete result.pages;
    }

    res.status(200).json(result);

  } catch (error) {
    console.log(error, 'Data Error');
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    });
  }
};


module.exports = {
  get_all_wisata,
  get_recomendasi_wisata,
  get_detail_wisata,
  get_all_wisata_byDesawisata
};