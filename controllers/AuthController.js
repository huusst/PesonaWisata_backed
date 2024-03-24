const db = require("../models");
const tbl_Otp = db.tbl_Otp;
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

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


module.exports = {
    sendOtp,
    VerifOtp
}; 