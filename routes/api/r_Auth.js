const router = require('express').Router();

const {
    sendOtp, VerifOtp,
} = require('../../controllers/AuthController')


router.post("/sendOTP", sendOtp);
router.post("/verifOTP", VerifOtp);

module.exports = router;