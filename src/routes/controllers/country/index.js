const express = require("express");
const router = express.Router()

router.use('/setAllCountries', require('./setCountries'))
// router.use('/getAllCountries', require('./login'))
module.exports = router;