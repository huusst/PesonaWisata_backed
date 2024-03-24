const db = require("../models");
const tbl_wisatawan = db.tbl_Wisatawan;


const checkExistEmailWisatawan = async (req, res) => {

  try {
    const { email } = req.body;

    const ExistEmail = await tbl_wisatawan.findOne({ where: { email: email } });

    if (ExistEmail) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Email sudah terdaftar!",
      });

    } else {
      return res.status(422).json({
        status: 422,
        success: false,
        message: "Email belum terdaftar!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

const post_wisatawan = async (req, res) => {
  try {
    const { name, no_hp, email, password } = req.body;

    const data = await tbl_wisatawan.create({
      name,
      no_hp,
      email,
      password,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "new Wisatawan created",
      data: {
        data: data,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

const get_all = async (req, res) => {
  try {
    const Wisatawans = await tbl_wisatawan.findAll();
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Data Wisatawan",
      data: {
        Wisatawans,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  get_all,
  post_wisatawan,
  checkExistEmailWisatawan
};