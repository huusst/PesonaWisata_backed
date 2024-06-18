const db = require('../models');
const tbl_DesaWisata = db.tbl_DesaWisata;
const tbl_Wisata = db.tbl_Wisata;
const tbl_Kuliner = db.tbl_Kuliner;
const tbl_Penginapan = db.tbl_Penginapan;
const Sequelize = require('sequelize');
const { Op, fn, col, literal } = require('sequelize');


const get_all_desawisata = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      keyword = '',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = keyword ? {
      [Op.or]: [
        { nama_desaWisata: { [Op.like]: `%${keyword}%` } },
        { desk_desaWisata: { [Op.like]: `%${keyword}%` } },
      ]
    } : {};


    const data = await tbl_DesaWisata.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: offset,
      include: [
        {
          model: tbl_Wisata,
          as: "desawisata_wisata_as",
          attributes: [
            "id_wisata",
          ],
        },
      ],
    });

    const totalPages = limit ? Math.ceil(data.count / (limit || 1)) : 1;
    if (data.count === 0) {
      return res.status(401).json({
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
    data.rows.sort((a, b) => {
      return b.desawisata_wisata_as.length - a.desawisata_wisata_as.length;
    });

    const result = {
      success: true,
      message: "Sukses mendapatkan data",
      data: data.rows.map((items) => ({
        id_desaWisata: items.id_desaWisata,
        nama_desaWisata: items.nama_desaWisata,
        desk_desaWisata: items.desk_desaWisata,
        sampul_desaWisata: items.sampul_desaWisata,
        kontak_person_desawisata: items.kontak_person_desawisata,
        data_wisata: {
          jumlah_wisata: items.desawisata_wisata_as.length
        }
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

const get_detail_desawisata = async (req, res) => {
  try {
    const { id_desaWisata } = req.params;

    if (!id_desaWisata) {
      return res.status(400).send({ error: "id_desawisata is required" });
    }

    const data = await tbl_DesaWisata.findOne({
      where: {
        id_desaWisata,
      },
    });

    const result = {
      success: true,
      message: "Sukses mendapatkan data",
      data: [{
        id_desaWisata: data.id_desaWisata,
        nama_desaWisata: data.nama_desaWisata,
        desk_desaWisata: data.desk_desaWisata,
        sampul_desaWisata: data.sampul_desaWisata,
        kontak_person_desawisata: data.kontak_person_desawisata,
      }],
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
  get_all_desawisata,
  get_detail_desawisata
};