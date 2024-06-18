const router = require('express').Router();

const {
    get_all_wisata,
    get_recomendasi_wisata,
    get_detail_wisata,
    get_all_wisata_byDesawisata
} = require('../../controllers/WisataController')


router.get("/wisata/get_all", get_all_wisata);
router.get("/wisata/get_all/:id_desaWisata", get_all_wisata_byDesawisata);
router.get("/wisata/detail/:id_wisata", get_detail_wisata);
router.post("/wisata/recomend", get_recomendasi_wisata);

module.exports = router;