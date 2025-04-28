const express = require('express');
const router = express.Router();

const {getAllCabins, addNewCabin} = require('../controller/CabinlyController')

//CABINLY

router.get('/get-all-cabins', getAllCabins);
router.post('/add-cabin', addNewCabin);

module.exports = router;
