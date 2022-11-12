const express = require('express');
const lotRoutes = require('lots');
const router = express.Router();

router.use('/lots', lotRoutes);


module.exports = router;