const db = require("../models");
const tbl_Otp = db.tbl_Otp;
const tbl_wisatawan = db.tbl_Wisatawan;
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    let id
    let name
    let email
    let password
    
    try {
        const user_wisatawan = await tbl_wisatawan.findOne({
            where: {
                email: req.body.email,
            },
        });
  
        // const user_admin = await tbl_user.findOne({
        //     where: {
        //         user_email: req.body.email,
        //     },
        // });
  
        if (!user_wisatawan) {
            return res.status(400).json({ msg: "Akun Anda tidak terdaftar!" });
        }
  
        if (user_wisatawan) {
            const match = await bcrypt.compare(
                req.body.password,
                user_wisatawan.password
            );
            if (!match) {
                return res.status(400).json({ msg: "Password Anda salah" });
            }

            id = user_wisatawan.id_wisatawan
            name = user_wisatawan.name
            email = user_wisatawan.email
            password = user_wisatawan.password
        }
  
        // if (user_admin) {
        //     const match = await bcrypt.compare(
        //         req.body.password,
        //         user_admin.user_password
        //     );
        //     if (!match) {
        //         return res.status(400).json({ msg: "Password User Anda salah" });
        //     }
        //     name = user_admin.user_username
        //     email = user_admin.user_email
        //     uuid = user_admin.user_uuid
        //     password = user_admin.user_password    
        // }
  
        const token = jwt.sign(
            {
                id, 
                email,
                password,
            }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN}
        );
  
        // Set cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            message: "Login Berhasil",
            data:{
                name,
                email
            } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
  
const Me = async (req, res) =>{
    let id
    let name
    let role
    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: "Akun Belum Login!" });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        id = decoded.id;
  
        const user_wisatawan = await tbl_wisatawan.findOne({
            attributes:['id_wisatawan', 'name'],
            where: {
                id_wisatawan: id
            }
        });
        
        // const user_admin = await tbl_user.findOne({
        //     attributes:['user_uuid', 'user_username'],
        //     where: {
        //         user_uuid: uuid
        //     }
        // });
        
        if (!user_wisatawan) { 
            return res.status(404).json({ msg: "User tidak ditemukan" });
        } 
        // else if (user_admin) {
        //     name = user_admin['user_username'];
        //     level = 'administrator';
        // } 
        else if (user_wisatawan) {
            name = user_wisatawan['name'];
            role = 'wisatawan';
        }
  
        res.status(200).json({ id, name, role });
    } catch (error) {
        console.error(error);
        // res.clearCookie('token');
        res.status(500).json({ msg: "Terjadi kesalahan pada server", error });
    }
}

const sendOtp = async (req, res) => {
    try {
        const email = req.body.email;
        const typesend = req.body.typesend;

        const otpActive = await tbl_Otp.findOne({ where: { email_user: email } });

        if (otpActive) {
            const currentTime = new Date();
            const expiredTime = otpActive.expiryTime;

            const timeDifference = (currentTime.getTime() - expiredTime.getTime()) / (1000 * 60); // Dalam menit

            if (timeDifference <= 5) {
                return res.status(422).json({
                    status: 422,
                    success: false,
                    message: "Terjadi Kesalahan, Coba lagi nanti!",
                });
            }else{
                await tbl_Otp.destroy({
                    where: {
                        email_user: email,
                    },
                  });
            }
        }

        const otp = otpGenerator.generate(6,
            {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

        // Simpan OTP dan waktu kadaluarsa dalam database
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 5); // Waktu kadaluarsa 5 menit dari sekarang
        const otpadd = await tbl_Otp.create({ email_user: email, otp: otp, expiryTime: expiryTime });

        if (!otpadd) {
            res.status(422).send('OTP sent Failed!');
        }



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nurafiifalmas@student.uns.ac.id',
                pass: 'qmaq qtyp lscc wnpu'
            }
        });

        const mailOptions = {
            from: 'nurafiifalmas@student.uns.ac.id',
            to: email,
            subject: 'Verifikasi Kode OTP',
            text: `Jangan berikan kode ini kepada orang lain, Kode OTP: ${otp}`
        };

        const mailOptionsreset = {
            from: 'nurafiifalmas@student.uns.ac.id',
            to: email,
            subject: 'Reset your password',
            text: `Jangan berikan kode ini kepada orang lain, Kode OTP: ${otp}`
        };

        if (typesend === "reset") {
            await transporter.sendMail(mailOptionsreset);
        }else{
            await transporter.sendMail(mailOptions);
        }


        return res.status(200).json({
            status: 200,
            success: true,
            message: "OTP sent successfully!",
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Error sending OTP');
    }
};

const VerifOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;

        const otpActive = await tbl_Otp.findOne({ where: { email_user: email, otp: otp } });

        if (otpActive) {
            const currentTime = new Date();
            const expiredTime = otpActive.expiryTime;

            const timeDifference = (currentTime.getTime() - expiredTime.getTime()) / (1000 * 60); // Dalam menit

            if (timeDifference <= 5) {
                
                const update = await tbl_Otp.destroy({
                    where: {
                        email_user: email,
                    },
                  });

                  if (update) {
                    return res.status(200).json({
                        status: 200,
                        success: true,
                        message: "Otp Valid!",
                    });
                  }
            }else{
                return res.status(422).json({
                    status: 422,
                    success: false,
                    message: "Kode OTP expired!",
                });
            }
        }else{
            return res.status(422).json({
                status: 422,
                success: false,
                message: "Kode OTP salah!",
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

const logOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: "Anda telah berhasil logout" });
  };


module.exports = {
    Login,
    Me,
    logOut,
    sendOtp,
    VerifOtp
}; 