const router = require("express").Router();
const r_Auth = require("./api/r_Auth");
const r_wisatawan = require("./api/r_Wisatawan");

router.use("/api", r_wisatawan, r_Auth);

module.exports = router;