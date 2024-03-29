const router = require('express').Router();

const {
    Login, logOut, Me, sendOtp, VerifOtp,
} = require('../../controllers/AuthController')


router.post("/wisatawan/login", Login);
router.post("/wisatawan/logout", logOut);
router.get("/wisatawan/me", Me);
router.post("/sendOTP", sendOtp);
router.post("/verifOTP", VerifOtp);

module.exports = router;