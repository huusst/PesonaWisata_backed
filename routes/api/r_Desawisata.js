const router = require('express').Router();

const {
    get_all_desawisata,
    get_detail_desawisata
} = require('../../controllers/DesawisataController')


router.get("/desawisata/get_all", get_all_desawisata);
router.get("/desawisata/:id_desaWisata", get_detail_desawisata);

module.exports = router;