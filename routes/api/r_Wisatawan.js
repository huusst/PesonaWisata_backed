const router = require('express').Router();

const {
    get_all,
    post_wisatawan,
    checkExistEmailWisatawan
} = require('../../controllers/WisatawanController')


router.get("/wisatawan/get_all", get_all);
router.post("/wisatawan", post_wisatawan);
router.post("/wisatawan/checkEmail", checkExistEmailWisatawan);

module.exports = router;